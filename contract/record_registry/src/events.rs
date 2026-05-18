use soroban_sdk::{symbol_short, Address, BytesN, Env, Symbol};

pub fn publish_record_created(
    env: &Env,
    patient: Address,
    seq: u64,
    record_type: Symbol,
    record_hash: BytesN<32>,
) {
    env.events().publish(
        (symbol_short!("RECORD"), symbol_short!("CREATED"), patient),
        (seq, record_type, record_hash),
    );
}

pub fn publish_record_amended(
    env: &Env,
    patient: Address,
    seq: u64,
    original_seq: u64,
    amendment_hash: BytesN<32>,
) {
    env.events().publish(
        (symbol_short!("RECORD"), symbol_short!("AMENDED"), patient),
        (seq, original_seq, amendment_hash),
    );
}
