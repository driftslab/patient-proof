#![no_std]
use shared::SharedError;
use soroban_sdk::{contract, contractimpl, Address, Bytes, BytesN, Env, Symbol};

mod types;
pub use types::{DataKey, RecordEntry};

#[cfg(test)]
mod test;

mod events;
use events::{publish_record_amended, publish_record_created};

// Import client for access control contract
use access_control::AccessControlContractClient;

#[contract]
pub struct RecordRegistryContract;

#[contractimpl]
impl RecordRegistryContract {
    pub fn initialize(
        env: Env,
        admin: Address,
        access_control: Address,
    ) -> Result<(), SharedError> {
        if env.storage().persistent().has(&DataKey::Admin) {
            return Err(SharedError::AlreadyInitialized);
        }
        env.storage().persistent().set(&DataKey::Admin, &admin);
        env.storage()
            .persistent()
            .set(&DataKey::AccessControl, &access_control);
        Ok(())
    }

    pub fn register_patient(env: Env, patient: Address) -> Result<(), SharedError> {
        patient.require_auth();
        let key = DataKey::PatientRegistered(patient.clone());
        if env.storage().persistent().has(&key) {
            return Err(SharedError::AlreadyInitialized);
        }
        env.storage().persistent().set(&key, &true);
        env.storage()
            .persistent()
            .set(&DataKey::RecordCount(patient.clone()), &0u64);

        // Publish event
        env.events().publish(
            (
                soroban_sdk::symbol_short!("PATIENT"),
                soroban_sdk::symbol_short!("REG"),
                patient,
            ),
            (),
        );

        Ok(())
    }

    pub fn write_record(
        env: Env,
        author: Address,
        patient: Address,
        record_hash: BytesN<32>,
        record_type: Symbol,
        encrypted_cid: Bytes,
        timestamp: u64,
    ) -> Result<u64, SharedError> {
        author.require_auth();

        // 1. Ensure patient is registered
        let register_key = DataKey::PatientRegistered(patient.clone());
        if !env.storage().persistent().has(&register_key) {
            return Err(SharedError::NotInitialized);
        }

        // 2. Enforce patient-controlled access: patient themselves OR delegated provider
        if author != patient {
            let access_control_addr: Address = env
                .storage()
                .persistent()
                .get(&DataKey::AccessControl)
                .ok_or(SharedError::NotInitialized)?;

            let ac_client = AccessControlContractClient::new(&env, &access_control_addr);
            // Will fail if no valid/active grant exists
            ac_client.check_access(&patient, &author);
        }

        // 3. Increment record count
        let count_key = DataKey::RecordCount(patient.clone());
        let count: u64 = env.storage().persistent().get(&count_key).unwrap_or(0);
        let seq = count + 1;
        env.storage().persistent().set(&count_key, &seq);

        // 4. Save record
        let record_key = DataKey::Record(patient.clone(), seq);
        let entry = RecordEntry {
            seq,
            record_type: record_type.clone(),
            record_hash: record_hash.clone(),
            encrypted_cid,
            author,
            patient: patient.clone(),
            timestamp,
            is_amendment: false,
            amends_seq: 0,
        };
        env.storage().persistent().set(&record_key, &entry);

        // 5. Emit event
        publish_record_created(&env, patient, seq, record_type, record_hash);

        Ok(seq)
    }

    pub fn amend_record(
        env: Env,
        author: Address,
        patient: Address,
        original_seq: u64,
        amendment_hash: BytesN<32>,
        reason: Bytes,
    ) -> Result<u64, SharedError> {
        author.require_auth();

        // 1. Check original record exists
        let original_key = DataKey::Record(patient.clone(), original_seq);
        if !env.storage().persistent().has(&original_key) {
            return Err(SharedError::RecordNotFound);
        }

        // 2. Enforce patient-controlled access: patient themselves OR delegated provider
        if author != patient {
            let access_control_addr: Address = env
                .storage()
                .persistent()
                .get(&DataKey::AccessControl)
                .ok_or(SharedError::NotInitialized)?;

            let ac_client = AccessControlContractClient::new(&env, &access_control_addr);
            ac_client.check_access(&patient, &author);
        }

        // 3. Increment record count
        let count_key = DataKey::RecordCount(patient.clone());
        let count: u64 = env.storage().persistent().get(&count_key).unwrap_or(0);
        let seq = count + 1;
        env.storage().persistent().set(&count_key, &seq);

        // 4. Save amendment record
        let record_key = DataKey::Record(patient.clone(), seq);
        let entry = RecordEntry {
            seq,
            record_type: Symbol::new(&env, "AMENDMENT"),
            record_hash: amendment_hash.clone(),
            encrypted_cid: reason, // In amendment, reason contains the IPFS cid of explanation
            author,
            patient: patient.clone(),
            timestamp: env.ledger().timestamp(),
            is_amendment: true,
            amends_seq: original_seq,
        };
        env.storage().persistent().set(&record_key, &entry);

        // 5. Emit event
        publish_record_amended(&env, patient, seq, original_seq, amendment_hash);

        Ok(seq)
    }

    pub fn get_record_count(env: Env, patient: Address) -> u64 {
        let count_key = DataKey::RecordCount(patient);
        env.storage().persistent().get(&count_key).unwrap_or(0)
    }

    pub fn get_record(env: Env, patient: Address, seq: u64) -> Result<RecordEntry, SharedError> {
        let record_key = DataKey::Record(patient, seq);
        env.storage()
            .persistent()
            .get(&record_key)
            .ok_or(SharedError::RecordNotFound)
    }
}
