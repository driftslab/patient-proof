use soroban_sdk::{contracttype, Address, Bytes, BytesN};

#[derive(Clone)]
#[contracttype]
pub enum ProviderKey {
    Admin,
    Provider(Address),
}

#[derive(Clone)]
#[contracttype]
pub struct ProviderEntry {
    pub provider: Address,
    pub name: Bytes,
    pub license_hash: BytesN<32>,
    pub verified: bool,
    pub registered_at: u64,
}
