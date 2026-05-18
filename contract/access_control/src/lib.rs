#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Vec};
use shared::SharedError;

mod types;
pub use types::{AccessGrant, AccessKey};

#[cfg(test)]
mod test;

mod events;
use events::{publish_access_granted, publish_access_revoked};

#[contract]
pub struct AccessControlContract;

#[contractimpl]
impl AccessControlContract {
    pub fn grant_access(
        env: Env,
        patient: Address,
        provider: Address,
        scope: Symbol,
        expires_at: u64,
    ) -> Result<(), SharedError> {
        patient.require_auth();

        if expires_at != 0 && expires_at <= env.ledger().timestamp() {
            return Err(SharedError::InvalidTimestamp);
        }

        let grant_key = AccessKey::Grant(patient.clone(), provider.clone());
        
        let grant = AccessGrant {
            provider: provider.clone(),
            scope: scope.clone(),
            granted_at: env.ledger().timestamp(),
            expires_at,
            active: true,
        };
        env.storage().persistent().set(&grant_key, &grant);

        let list_key = AccessKey::PatientGrants(patient.clone());
        let mut providers: Vec<Address> = env
            .storage()
            .persistent()
            .get(&list_key)
            .unwrap_or_else(|| Vec::new(&env));

        let mut found = false;
        for i in 0..providers.len() {
            if providers.get(i).unwrap() == provider {
                found = true;
                break;
            }
        }
        if !found {
            providers.push_back(provider.clone());
            env.storage().persistent().set(&list_key, &providers);
        }

        publish_access_granted(&env, patient, provider, scope, expires_at);

        Ok(())
    }

    pub fn revoke_access(
        env: Env,
        patient: Address,
        provider: Address,
    ) -> Result<(), SharedError> {
        patient.require_auth();

        let grant_key = AccessKey::Grant(patient.clone(), provider.clone());
        let mut grant: AccessGrant = env
            .storage()
            .persistent()
            .get(&grant_key)
            .ok_or(SharedError::RecordNotFound)?;

        if !grant.active {
            return Err(SharedError::RecordNotFound);
        }

        grant.active = false;
        env.storage().persistent().set(&grant_key, &grant);

        publish_access_revoked(&env, patient, provider);

        Ok(())
    }

    pub fn check_access(
        env: Env,
        patient: Address,
        provider: Address,
    ) -> Result<AccessGrant, SharedError> {
        let grant_key = AccessKey::Grant(patient, provider);
        let grant: AccessGrant = env
            .storage()
            .persistent()
            .get(&grant_key)
            .ok_or(SharedError::AccessDenied)?;

        if !grant.active {
            return Err(SharedError::AccessDenied);
        }

        if grant.expires_at != 0 && env.ledger().timestamp() >= grant.expires_at {
            return Err(SharedError::AccessExpired);
        }

        Ok(grant)
    }

    pub fn list_grants(env: Env, patient: Address) -> Vec<AccessGrant> {
        let list_key = AccessKey::PatientGrants(patient.clone());
        let providers: Vec<Address> = env
            .storage()
            .persistent()
            .get(&list_key)
            .unwrap_or_else(|| Vec::new(&env));

        let mut grants = Vec::new(&env);
        for i in 0..providers.len() {
            let provider = providers.get(i).unwrap();
            let grant_key = AccessKey::Grant(patient.clone(), provider);
            if let Some(grant) = env.storage().persistent().get::<_, AccessGrant>(&grant_key) {
                grants.push_back(grant);
            }
        }
        grants
    }
}
