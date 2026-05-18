export interface StellarAccount {
  address: string;
  sequence: string;
  balances: {
    asset_type: string;
    balance: string;
    asset_code?: string;
    asset_issuer?: string;
  }[];
}

export enum VaultMedicEventType {
  RECORD_CREATED = "RECORD_CREATED",
  RECORD_AMENDED = "RECORD_AMENDED",
  ACCESS_GRANTED = "ACCESS_GRANTED",
  ACCESS_REVOKED = "ACCESS_REVOKED",
  PATIENT_REGISTERED = "PATIENT_REGISTERED",
  PROVIDER_VERIFIED = "PROVIDER_VERIFIED",
  UNKNOWN = "UNKNOWN",
}

export interface VaultMedicEvent {
  id: string;
  contractId: string;
  category: string;     // e.g. "RECORD", "ACCESS", "PATIENT", "PROVIDER"
  action: string;       // e.g. "CREATED", "AMENDED", "GRANTED", "REVOKED", "REG", "VERIFIED"
  actor: string;        // e.g. G... address
  type: VaultMedicEventType;
  data: any[];          // Decoded topics and values
  ledger: number;
  ledgerClosedAt: string;
  txHash: string;
}

export interface DecodedRecordEntry {
  seq: number;
  recordType: string;
  recordHash: string; // Hex string of 32 bytes
  encryptedCid: string; // IPFS CID string
  author: string;
  patient: string;
  timestamp: number;
  isAmendment: boolean;
  amendsSeq: number;
}

export interface DecodedAccessGrant {
  provider: string;
  scope: string;
  grantedAt: number;
  expiresAt: number;
  active: boolean;
}

export interface LedgerEntry {
  lastModifiedLedgerSeq: number;
  key: string;
  xdr: string;
}

export interface RpcResponse<T> {
  jsonrpc: string;
  id: number;
  result: T;
}
