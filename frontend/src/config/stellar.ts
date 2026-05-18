import { TESTNET_RPC_URL, TESTNET_HORIZON_URL, TESTNET_PASSPHRASE } from "@/lib/stellar/constants";

export const stellarConfig = {
  network: process.env.NEXT_PUBLIC_STELLAR_NETWORK || "testnet",
  rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL || TESTNET_RPC_URL,
  horizonUrl: process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL || TESTNET_HORIZON_URL,
  networkPassphrase: process.env.NEXT_PUBLIC_STELLAR_PASSPHRASE || TESTNET_PASSPHRASE,
  contracts: {
    recordRegistry: process.env.NEXT_PUBLIC_RECORD_REGISTRY_CONTRACT_ID || "",
    accessControl: process.env.NEXT_PUBLIC_ACCESS_CONTROL_CONTRACT_ID || "",
    providerRegistry: process.env.NEXT_PUBLIC_PROVIDER_REGISTRY_CONTRACT_ID || "",
  },
  operator: {
    publicKey: process.env.STELLAR_OPERATOR_PUBLIC_KEY || "",
    // Prevent secret key leak to browser
    secretKey: typeof window === "undefined" ? process.env.STELLAR_OPERATOR_SECRET_KEY || "" : "",
  },
  demo: {
    patientAddress: process.env.NEXT_PUBLIC_DEMO_PATIENT_ADDRESS || "",
    contractId: process.env.NEXT_PUBLIC_DEMO_CONTRACT_ID || "",
  },
};
