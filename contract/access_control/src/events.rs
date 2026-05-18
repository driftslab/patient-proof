use soroban_sdk::{symbol_short, Address, Env, Symbol};

pub fn publish_access_granted(
    env: &Env,
    patient: Address,
    provider: Address,
    scope: Symbol,
    expires_at: u64,
) {
    env.events().publish(
        (symbol_short!("ACCESS"), symbol_short!("GRANTED"), patient),
        (provider, scope, expires_at),
    );
}

pub fn publish_access_revoked(env: &Env, patient: Address, provider: Address) {
    env.events().publish(
        (symbol_short!("ACCESS"), symbol_short!("REVOKED"), patient),
        (provider,),
    );
}
