import { pgTable, serial, varchar, timestamp, bigint, boolean } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  stellarAddress: varchar("stellar_address", { length: 56 }).unique().notNull(),
  contractId: varchar("contract_id", { length: 56 }),
  displayName: varchar("display_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const providers = pgTable("providers", {
  id: serial("id").primaryKey(),
  stellarAddress: varchar("stellar_address", { length: 56 }).unique().notNull(),
  displayName: varchar("display_name", { length: 255 }),
  licenseHash: varchar("license_hash", { length: 64 }), // Hex string of 32 bytes
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recordsIndex = pgTable("records_index", {
  id: serial("id").primaryKey(),
  patientStellarAddress: varchar("patient_stellar_address", { length: 56 }).notNull(),
  contractId: varchar("contract_id", { length: 56 }),
  ledgerSeq: bigint("ledger_seq", { mode: "number" }),
  recordType: varchar("record_type", { length: 32 }), // DIAGNOSIS, PRESCRIPTION, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accessGrants = pgTable("access_grants", {
  id: serial("id").primaryKey(),
  patientAddress: varchar("patient_address", { length: 56 }).notNull(),
  providerAddress: varchar("provider_address", { length: 56 }).notNull(),
  grantedAt: timestamp("granted_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  revokedAt: timestamp("revoked_at"),
  grantLedgerSeq: bigint("grant_ledger_seq", { mode: "number" }),
  active: boolean("active").default(true).notNull(),
});
