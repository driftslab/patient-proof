#![cfg(test)]
use super::*;
use soroban_sdk::{
    testutils::Address as _,
    symbol_short,
    Address,
    Env,
    Bytes,
    BytesN,
};

#[test]
fn test_write_and_amend_record() {
    let env = Env::default();
    env.mock_all_auths();

    // 1. Deploy AccessControl
    let ac_contract_id = env.register_contract(None, access_control::AccessControlContract);
    let ac_client = access_control::AccessControlContractClient::new(&env, &ac_contract_id);

    // 2. Deploy RecordRegistry
    let rr_contract_id = env.register_contract(None, RecordRegistryContract);
    let rr_client = RecordRegistryContractClient::new(&env, &rr_contract_id);

    let admin = Address::generate(&env);
    let patient = Address::generate(&env);
    let provider = Address::generate(&env);

    // 3. Initialize RecordRegistry
    rr_client.initialize(&admin, &ac_contract_id);

    // 4. Register patient
    rr_client.register_patient(&patient);
    assert_eq!(rr_client.get_record_count(&patient), 0);

    // 5. Try writing record as provider (should fail since access is not granted yet)
    let record_hash = BytesN::from_array(&env, &[1; 32]);
    let record_type = symbol_short!("DIAG");
    let cid = Bytes::from_slice(&env, b"ipfs://QmSomeHash");

    let fail_res = rr_client.try_write_record(&provider, &patient, &record_hash, &record_type, &cid, &12345);
    assert!(fail_res.is_err());

    // 6. Grant access on AccessControl
    ac_client.grant_access(&patient, &provider, &symbol_short!("FULL"), &0);

    // 7. Write record as provider (should succeed now!)
    let seq = rr_client.write_record(&provider, &patient, &record_hash, &record_type, &cid, &12345);
    assert_eq!(seq, 1);
    assert_eq!(rr_client.get_record_count(&patient), 1);

    // 8. Fetch record and verify
    let entry = rr_client.get_record(&patient, &1);
    assert_eq!(entry.seq, 1);
    assert_eq!(entry.record_hash, record_hash);
    assert_eq!(entry.author, provider);

    // 9. Amend record as provider
    let amend_hash = BytesN::from_array(&env, &[2; 32]);
    let reason = Bytes::from_slice(&env, b"ipfs://QmAmendmentReasonHash");
    let amend_seq = rr_client.amend_record(&provider, &patient, &1, &amend_hash, &reason);
    assert_eq!(amend_seq, 2);
    assert_eq!(rr_client.get_record_count(&patient), 2);

    let entry_amended = rr_client.get_record(&patient, &2);
    assert_eq!(entry_amended.seq, 2);
    assert_eq!(entry_amended.is_amendment, true);
    assert_eq!(entry_amended.amends_seq, 1);
    assert_eq!(entry_amended.record_hash, amend_hash);
}
