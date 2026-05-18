import {
  TransactionBuilder,
  Address,
  Operation,
  BASE_FEE,
  xdr,
} from "@stellar/stellar-sdk";
import { getRpcClient } from "./rpc";
import { loadAccount } from "./horizon";
import { CONTRACT_IDS, TESTNET_PASSPHRASE } from "./constants";
import { addressToScVal, symbolToScVal, bytesToScVal, u64ToScVal } from "./scval";
import { Buffer } from "buffer";

// Helper to prepare transaction (simulate + add footprint + add fees)
async function prepareTransaction(
  sourceAddress: string,
  operation: xdr.Operation,
): Promise<string> {
  const rpc = getRpcClient();
  const account = await loadAccount(sourceAddress);
  const passphrase = process.env.NEXT_PUBLIC_STELLAR_PASSPHRASE || TESTNET_PASSPHRASE;

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: passphrase,
  })
    .addOperation(operation)
    .setTimeout(60) // 60 seconds timeout
    .build();

  // Soroban RPC automatically simulates, parses footprint, and adds resource fees
  const preparedTx = await rpc.prepareTransaction(tx);
  return preparedTx.toXDR();
}

export async function buildWriteRecordTx(params: {
  author: string;
  patient: string;
  recordHash: Uint8Array;
  recordType: string;
  encryptedCid: string;
  timestamp: number;
}): Promise<string> {
  const contractId = CONTRACT_IDS.recordRegistry;
  if (!contractId) throw new Error("Record Registry Contract ID not configured.");

  const cidBytes = Buffer.from(params.encryptedCid);

  const operation = Operation.invokeContractFunction({
    contract: contractId,
    function: "write_record",
    args: [
      addressToScVal(params.author),
      addressToScVal(params.patient),
      bytesToScVal(params.recordHash),
      symbolToScVal(params.recordType),
      bytesToScVal(cidBytes),
      u64ToScVal(params.timestamp),
    ],
  });

  return await prepareTransaction(params.author, operation);
}

export async function buildAmendRecordTx(params: {
  author: string;
  patient: string;
  originalSeq: number;
  amendmentHash: Uint8Array;
  reasonCid: string;
}): Promise<string> {
  const contractId = CONTRACT_IDS.recordRegistry;
  if (!contractId) throw new Error("Record Registry Contract ID not configured.");

  const reasonBytes = Buffer.from(params.reasonCid);

  const operation = Operation.invokeContractFunction({
    contract: contractId,
    function: "amend_record",
    args: [
      addressToScVal(params.author),
      addressToScVal(params.patient),
      u64ToScVal(params.originalSeq),
      bytesToScVal(params.amendmentHash),
      bytesToScVal(reasonBytes),
    ],
  });

  return await prepareTransaction(params.author, operation);
}

export async function buildGrantAccessTx(params: {
  patient: string;
  provider: string;
  scope: string; // FULL / READ_ONLY / EMERGENCY
  expiresAt: number; // unix seconds (0 for no expiry)
}): Promise<string> {
  const contractId = CONTRACT_IDS.accessControl;
  if (!contractId) throw new Error("Access Control Contract ID not configured.");

  const operation = Operation.invokeContractFunction({
    contract: contractId,
    function: "grant_access",
    args: [
      addressToScVal(params.patient),
      addressToScVal(params.provider),
      symbolToScVal(params.scope),
      u64ToScVal(params.expiresAt),
    ],
  });

  return await prepareTransaction(params.patient, operation);
}

export async function buildRevokeAccessTx(params: {
  patient: string;
  provider: string;
}): Promise<string> {
  const contractId = CONTRACT_IDS.accessControl;
  if (!contractId) throw new Error("Access Control Contract ID not configured.");

  const operation = Operation.invokeContractFunction({
    contract: contractId,
    function: "revoke_access",
    args: [
      addressToScVal(params.patient),
      addressToScVal(params.provider),
    ],
  });

  return await prepareTransaction(params.patient, operation);
}
