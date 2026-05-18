import { Buffer } from "buffer";

const getCrypto = (): Crypto => {
  if (typeof window !== "undefined" && window.crypto) {
    return window.crypto;
  }
  return (require("crypto") as any).webcrypto as Crypto;
};

export async function hashRecord(data: Uint8Array): Promise<Uint8Array> {
  const crypto = getCrypto();
  const hashBuffer = await crypto.subtle.digest("SHA-256", data as any);
  return new Uint8Array(hashBuffer);
}

export async function hashRecordHex(data: Uint8Array): Promise<string> {
  const hashBytes = await hashRecord(data);
  return Buffer.from(hashBytes).toString("hex");
}

export async function generateSha256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return hashRecordHex(data);
}

