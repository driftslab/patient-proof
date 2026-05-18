import { nativeToScVal, scValToNative, xdr, Address } from "@stellar/stellar-sdk";

export function addressToScVal(address: string): xdr.ScVal {
  return Address.fromString(address).toScVal();
}

export function symbolToScVal(sym: string): xdr.ScVal {
  return xdr.ScVal.scvSymbol(sym);
}

export function bytesToScVal(bytes: Uint8Array): xdr.ScVal {
  return xdr.ScVal.scvBytes(Buffer.from(bytes));
}

export function u64ToScVal(n: bigint | number): xdr.ScVal {
  return nativeToScVal(BigInt(n), { type: "u64" });
}

export function scValToAddress(val: xdr.ScVal): string {
  return Address.fromScVal(val).toString();
}

export function scValToU64(val: xdr.ScVal): bigint {
  return scValToNative(val) as bigint;
}

export function scValToBytes(val: xdr.ScVal): Uint8Array {
  return scValToNative(val) as Uint8Array;
}
