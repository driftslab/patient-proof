import axios from "axios";

// Public gateway fallbacks for querying directly
const IPFS_GATEWAYS = [
  "https://cloudflare-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
];

export async function uploadEncryptedRecord(
  ciphertext: string,
  iv: string,
  encryptedKey: string,
): Promise<string> {
  const response = await axios.post("/api/ipfs/upload", {
    ciphertext,
    iv,
    encryptedKey,
  });

  if (!response.data.success) {
    throw new Error(response.data.error || "Failed to upload encrypted payload to IPFS");
  }

  return response.data.data.cid;
}

export async function fetchEncryptedRecord(
  cid: string,
): Promise<{ ciphertext: string; iv: string; encryptedKey: string }> {
  // Try calling our internal proxy endpoint first
  try {
    const response = await axios.get(`/api/ipfs/fetch?cid=${cid}`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.warn("Failed fetching from internal IPFS endpoint, trying gateway fallbacks...", error);
  }

  // Fallback to public gateways
  for (const gateway of IPFS_GATEWAYS) {
    try {
      const response = await axios.get(`${gateway}${cid}`, { timeout: 6000 });
      if (response.data && response.data.ciphertext) {
        return response.data;
      }
    } catch (e) {
      console.warn(`Gateway fallback failed for: ${gateway}`, e);
    }
  }

  throw new Error("Unable to retrieve encrypted record from IPFS network or public gateways.");
}
