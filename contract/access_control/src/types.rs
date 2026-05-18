use soroban_sdk::{contracttype, Address, Symbol};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum AccessKey {
    Grant(Address, Address),     // (patient, provider) -> AccessGrant
    PatientGrants(Address),      // patient -> Vec<Address>
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct AccessGrant {
    pub provider: Address,
    pub scope: Symbol,           // FULL / READ_ONLY / EMERGENCY
    pub granted_at: u64,
    pub expires_at: u64,         // 0 = no expiry
    pub active: bool,
}
