export const TESTNET_RPC_URL = "https://soroban-testnet.stellar.org";
export const MAINNET_RPC_URL = "https://rpc.stellar.org"; // Or private RPC

export const TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
export const MAINNET_HORIZON_URL = "https://horizon.stellar.org";

export const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";
export const MAINNET_PASSPHRASE = "Public Stellar Network ; November 2015";

export const STELLAR_EXPERT_TESTNET_URL = "https://stellar.expert/explorer/testnet";
export const STELLAR_LABORATORY_URL = "https://laboratory.stellar.org";

export const CONTRACT_IDS = {
  recordRegistry: process.env.NEXT_PUBLIC_RECORD_REGISTRY_CONTRACT_ID || "",
  accessControl: process.env.NEXT_PUBLIC_ACCESS_CONTROL_CONTRACT_ID || "",
  providerRegistry: process.env.NEXT_PUBLIC_PROVIDER_REGISTRY_CONTRACT_ID || "",
};

export enum StellarNetwork {
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

export const EVENT_CATEGORIES = {
  RECORD: "RECORD",
  ACCESS: "ACCESS",
  PATIENT: "PATIENT",
  PROVIDER: "PROVIDER",
};

export const EVENT_ACTIONS = {
  CREATED: "CREATED",
  AMENDED: "AMENDED",
  GRANTED: "GRANTED",
  REVOKED: "REVOKED",
  REG: "REG",
  VERIFIED: "VERIFIED",
};
