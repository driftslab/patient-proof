export enum RecordType {
  DIAGNOSIS = "DIAGNOSIS",
  PRESCRIPTION = "PRESCRIPTION",
  LAB = "LAB",
  REFERRAL = "REFERRAL",
  DISCHARGE = "DISCHARGE",
}

export interface MedicalRecord {
  id: number;
  seq: number;
  patientAddress: string;
  authorAddress: string;
  recordType: RecordType;
  recordHash: string; // SHA-256 hex
  encryptedCid: string; // IPFS CID of ciphertext
  timestamp: number; // unix seconds
  isAmendment: boolean;
  amendsSeq?: number;
  // Decrypted contents (only available in-memory after client decrypts)
  decryptedData?: {
    diagnosis?: string;
    notes?: string;
    medications?: string;
    labResults?: string;
    referralHospital?: string;
    reason?: string;
  };
}

export interface EncryptedRecord {
  ciphertext: string; // Base64 encoded encrypted bytes
  iv: string; // Hex initialization vector
  encryptedKey: string; // Ephemeral key encrypted with patient's public key (hex or base64)
}

export interface Patient {
  id: number;
  stellarAddress: string;
  contractId?: string;
  displayName?: string;
  createdAt: Date;
}

export interface Provider {
  id: number;
  stellarAddress: string;
  displayName?: string;
  licenseHash?: string;
  verifiedAt?: Date;
  createdAt: Date;
}

export interface AccessGrant {
  id: number;
  patientAddress: string;
  providerAddress: string;
  grantedAt: Date;
  expiresAt?: Date;
  revokedAt?: Date;
  grantLedgerSeq?: number;
  active: boolean;
  scope: "FULL" | "READ_ONLY" | "EMERGENCY";
}

export interface AuditEntry {
  seq: number;
  action: "CREATE" | "AMEND" | "ACCESS_GRANTED" | "ACCESS_REVOKED" | "PATIENT_REGISTERED";
  actor: string;
  timestamp: number;
  ledgerSeq: number;
  txHash: string;
  details: string;
}
