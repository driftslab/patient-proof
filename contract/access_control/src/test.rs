#![cfg(test)]
use super::*;
use soroban_sdk::{testutils::Address as _, symbol_short, Address, Env};

#[test]
fn test_access_grant_and_revoke() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, AccessControlContract);
    let client = AccessControlContractClient::new(&env, &contract_id);

    let patient = Address::generate(&env);
    let provider = Address::generate(&env);
    let scope = symbol_short!("FULL");

    // Grant access
    client.grant_access(&patient, &provider, &scope, &0);

    // Check access
    let grant = client.check_access(&patient, &provider);
    assert_eq!(grant.provider, provider);
    assert_eq!(grant.scope, scope);
    assert_eq!(grant.active, true);

    // List grants
    let grants = client.list_grants(&patient);
    assert_eq!(grants.len(), 1);
    assert_eq!(grants.get(0).unwrap().provider, provider);

    // Revoke access
    client.revoke_access(&patient, &provider);

    // Check access should fail
    let check_res = client.try_check_access(&patient, &provider);
    assert!(check_res.is_err());
}
