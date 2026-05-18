use super::*;
use soroban_sdk::{testutils::Address as _, Address, Bytes, BytesN, Env};

#[test]
#[allow(deprecated)]
fn test_register_and_verify() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, ProviderRegistryContract);
    let client = ProviderRegistryContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let provider = Address::generate(&env);

    client.initialize(&admin);

    let name = Bytes::from_slice(&env, b"Dr. John Doe");
    let mut license_bytes = [0u8; 32];
    license_bytes[0] = 1;
    let license_hash = BytesN::from_array(&env, &license_bytes);

    client.register_provider(&provider, &name, &license_hash);
    assert!(!client.is_verified(&provider));

    client.verify_provider(&admin, &provider);
    assert!(client.is_verified(&provider));

    let entry = client.get_provider(&provider);
    assert_eq!(entry.provider, provider);
    assert!(entry.verified);
}
