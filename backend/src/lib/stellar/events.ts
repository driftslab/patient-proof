import { xdr, scValToNative } from "@stellar/stellar-sdk";
import { VaultMedicEvent, VaultMedicEventType } from "../../types/stellar";
import { EVENT_CATEGORIES, EVENT_ACTIONS } from "./constants";

export function decodeContractEvent(raw: any): VaultMedicEvent {
  // Parse topics and value from XDR base64 format
  const topics = raw.topic.map((t: string) => scValToNative(xdr.ScVal.fromXDR(t, "base64")));
  const rawValue = xdr.ScVal.fromXDR(raw.value, "base64");
  const value = scValToNative(rawValue);

  const category = topics[0] as string; // "RECORD", "ACCESS", "PATIENT", "PROVIDER"
  const action = topics[1] as string;   // "CREATED", "AMENDED", "GRANTED", "REVOKED", "REG", "VERIFIED"
  const actor = topics[2] as string;    // Public address of actor/patient

  let type = VaultMedicEventType.UNKNOWN;

  if (category === EVENT_CATEGORIES.RECORD) {
    if (action === EVENT_ACTIONS.CREATED) type = VaultMedicEventType.RECORD_CREATED;
    else if (action === EVENT_ACTIONS.AMENDED) type = VaultMedicEventType.RECORD_AMENDED;
  } else if (category === EVENT_CATEGORIES.ACCESS) {
    if (action === EVENT_ACTIONS.GRANTED) type = VaultMedicEventType.ACCESS_GRANTED;
    else if (action === EVENT_ACTIONS.REVOKED) type = VaultMedicEventType.ACCESS_REVOKED;
  } else if (category === EVENT_CATEGORIES.PATIENT) {
    if (action === "REG" || action === "REGISTERED") type = VaultMedicEventType.PATIENT_REGISTERED;
  } else if (category === EVENT_CATEGORIES.PROVIDER) {
    if (action === EVENT_ACTIONS.VERIFIED || action === "REG") type = VaultMedicEventType.PROVIDER_VERIFIED;
  }

  // Value decoding maps to array
  let data: any[] = [];
  if (value !== undefined && value !== null) {
    data = Array.isArray(value) ? value : [value];
  }

  return {
    id: raw.id || "",
    contractId: raw.contractId || "",
    category,
    action,
    actor,
    type,
    data,
    ledger: raw.ledger,
    ledgerClosedAt: raw.ledgerClosedAt || new Date().toISOString(),
    txHash: raw.txHash || "",
  };
}
