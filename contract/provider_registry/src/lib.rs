#![no_std]
use shared::SharedError;
use soroban_sdk::{contract, contractimpl, Address, Bytes, BytesN, Env};

mod types;
pub use types::{ProviderEntry, ProviderKey};

#[cfg(test)]
mod test;

#[contract]
pub struct ProviderRegistryContract;

#[contractimpl]
impl ProviderRegistryContract {
    pub fn initialize(env: Env, admin: Address) -> Result<(), SharedError> {
        if env.storage().persistent().has(&ProviderKey::Admin) {
            return Err(SharedError::AlreadyInitialized);
        }
        env.storage().persistent().set(&ProviderKey::Admin, &admin);
        Ok(())
    }

    pub fn register_provider(
        env: Env,
        provider: Address,
        name: Bytes,
        license_hash: BytesN<32>,
    ) -> Result<(), SharedError> {
        provider.require_auth();

        let key = ProviderKey::Provider(provider.clone());
        if env.storage().persistent().has(&key) {
            return Err(SharedError::AlreadyInitialized);
        }

        let entry = ProviderEntry {
            provider: provider.clone(),
            name,
            license_hash,
            verified: false,
            registered_at: env.ledger().timestamp(),
        };

        env.storage().persistent().set(&key, &entry);

        // Publish event
        env.events().publish(
            (
                soroban_sdk::symbol_short!("PROVIDER"),
                soroban_sdk::symbol_short!("REG"),
                provider,
            ),
            (),
        );

        Ok(())
    }

    pub fn verify_provider(env: Env, admin: Address, provider: Address) -> Result<(), SharedError> {
        admin.require_auth();

        let admin_stored: Address = env
            .storage()
            .persistent()
            .get(&ProviderKey::Admin)
            .ok_or(SharedError::NotInitialized)?;

        if admin_stored != admin {
            return Err(SharedError::Unauthorized);
        }

        let key = ProviderKey::Provider(provider.clone());
        let mut entry: ProviderEntry = env
            .storage()
            .persistent()
            .get(&key)
            .ok_or(SharedError::RecordNotFound)?;

        entry.verified = true;
        env.storage().persistent().set(&key, &entry);

        // Publish event
        env.events().publish(
            (
                soroban_sdk::symbol_short!("PROVIDER"),
                soroban_sdk::symbol_short!("VERIFIED"),
                provider,
            ),
            entry.license_hash,
        );

        Ok(())
    }

    pub fn get_provider(env: Env, provider: Address) -> Result<ProviderEntry, SharedError> {
        let key = ProviderKey::Provider(provider);
        env.storage()
            .persistent()
            .get(&key)
            .ok_or(SharedError::RecordNotFound)
    }

    pub fn is_verified(env: Env, provider: Address) -> bool {
        let key = ProviderKey::Provider(provider);
        if let Some(entry) = env.storage().persistent().get::<_, ProviderEntry>(&key) {
            entry.verified
        } else {
            false
        }
    }
}
