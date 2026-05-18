import { Keypair } from "@stellar/stellar-sdk";

export function isStellarAddress(str: string): boolean {
  if (!str || str.length !== 56) return false;
  if (!str.startsWith("G")) return false;
  try {
    Keypair.fromPublicKey(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function isContractId(str: string): boolean {
  if (!str || str.length !== 56) return false;
  if (!str.startsWith("C")) return false;
  return true;
}

export function isValidCid(str: string): boolean {
  if (!str) return false;
  // Standard v0 CIDs start with Qm (46 chars), v1 start with bafy (59 chars), or contain protocol marker
  return (
    (str.startsWith("Qm") && str.length === 46) ||
    (str.startsWith("bafy") && str.length === 59) ||
    str.startsWith("ipfs://")
  );
}
