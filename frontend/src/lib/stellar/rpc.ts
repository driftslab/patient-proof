import { rpc as StellarRpc, Transaction } from "@stellar/stellar-sdk";
import { TESTNET_RPC_URL } from "./constants";

let rpcClient: StellarRpc.Server | null = null;

export function getRpcClient(): StellarRpc.Server {
  if (!rpcClient) {
    const url = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || TESTNET_RPC_URL;
    rpcClient = new StellarRpc.Server(url, {
      allowHttp: true, // Allow local dev testing if HTTP is needed
    });
  }
  return rpcClient;
}

export async function getLatestLedger(): Promise<number> {
  const rpc = getRpcClient();
  const response = await rpc.getLatestLedger();
  return response.sequence;
}

export async function simulateTx(tx: Transaction): Promise<StellarRpc.Api.SimulateTransactionResponse> {
  const rpc = getRpcClient();
  return await rpc.simulateTransaction(tx);
}

export async function submitTx(tx: Transaction): Promise<StellarRpc.Api.SendTransactionResponse> {
  const rpc = getRpcClient();
  return await rpc.sendTransaction(tx);
}

export async function getEvents(
  contractId: string,
  startLedger: number,
  limit: number = 50,
  cursor?: string,
): Promise<{ events: StellarRpc.Api.RawEventResponse[]; cursor?: string }> {
  const rpc = getRpcClient();

  const response = await rpc.getEvents({
    startLedger,
    filters: [
      {
        type: "contract",
        contractIds: [contractId],
      },
    ],
    pagination: {
      cursor,
      limit,
    },
  });

  return {
    events: response.events,
    cursor: response.latestLedger ? String(response.latestLedger) : undefined, // Or cursor if available
  };
}
