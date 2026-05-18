#![no_std]
use soroban_sdk::contracterror;

pub const RECORD_VERSION: u32 = 1;
pub const MAX_ENCRYPTED_CID_LEN: u32 = 128;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum SharedError {
    NotInitialized = 100,
    AlreadyInitialized = 101,
    Unauthorized = 102,
    InvalidAddress = 103,
    InvalidRecordHash = 104,
    InvalidTimestamp = 105,
    RecordNotFound = 106,
    AccessExpired = 107,
    AccessDenied = 108,
}
