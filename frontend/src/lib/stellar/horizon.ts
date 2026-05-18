import { Horizon } from "@stellar/stellar-sdk";
import { TESTNET_HORIZON_URL } from "./constants";

let horizonClient: Horizon.Server | null = null;

export function getHorizonClient(): Horizon.Server {
  if (!horizonClient) {
    const url = process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL || TESTNET_HORIZON_URL;
    horizonClient = new Horizon.Server(url);
  }
  return horizonClient;
}

export async function loadAccount(address: string): Promise<Horizon.Server.AccountResponse> {
  const server = getHorizonClient();
  return await server.loadAccount(address);
}

export async function getTransactions(address: string, limit: number = 10): Promise<Horizon.Server.TransactionResponse[]> {
  const server = getHorizonClient();
  const response = await server
    .transactions()
    .forAccount(address)
    .order("desc")
    .limit(limit)
    .call();
  return response.records;
}
