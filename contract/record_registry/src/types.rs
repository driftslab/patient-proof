use soroban_sdk::{contracttype, Address, Bytes, BytesN, Symbol};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    AccessControl,
    PatientRegistered(Address),
    RecordCount(Address),
    Record(Address, u64), // (patient, sequence) -> RecordEntry
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct RecordEntry {
    pub seq: u64,
    pub record_type: Symbol, // DIAGNOSIS / PRESCRIPTION / LAB / REFERRAL / DISCHARGE
    pub record_hash: BytesN<32>, // SHA-256 of encrypted content
    pub encrypted_cid: Bytes, // IPFS CID of encrypted content (bytes of UTF-8 string)
    pub author: Address,     // Provider who wrote the record
    pub patient: Address,
    pub timestamp: u64, // Unix seconds
    pub is_amendment: bool,
    pub amends_seq: u64, // 0 if not an amendment
}
