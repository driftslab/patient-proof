import { getEvents, getLatestLedger } from "../lib/stellar/rpc.js";
import { decodeContractEvent } from "../lib/stellar/events.js";
import dotenv from "dotenv";

dotenv.config();

async function checkEvents() {
  const contractId = process.env.NEXT_PUBLIC_RECORD_REGISTRY_CONTRACT_ID || "CBRECDX3YZS54GHKPNS2RCK6L2SDPMX6P7A6DXPLK25GGEXNO9L2RECD";
  console.log("==================================================================");
  console.log(` Querying Soroban RPC Contract Events Audit Trail                `);
  console.log("==================================================================");
  console.log(` Contract ID: ${contractId}`);

  try {
    const latest = await getLatestLedger();
    const startLedger = Math.max(1, latest - 2000); // Scan last 2000 ledgers
    console.log(` Target scan window: Ledgers #${startLedger.toLocaleString()} to #${latest.toLocaleString()}`);

    const result = await getEvents(contractId, startLedger);
    console.log(` Fetched ${result.events.length} event(s). Parsing details...`);

    if (result.events.length === 0) {
      console.log("\n No recent events detected in scanning window.");
      console.log(" Create new medical record entries to trigger on-chain events.");
    }

    for (const raw of result.events) {
      const decoded = decodeContractEvent(raw);
      console.log(" ────────────────────────────────────────────────────────────");
      console.log(`  Event ID:      ${decoded.id}`);
      console.log(`  Ledger Seq:    #${decoded.ledger}`);
      console.log(`  Tx Hash:       ${decoded.txHash || "N/A"}`);
      console.log(`  Category:      ${decoded.category}`);
      console.log(`  Action:        ${decoded.action}`);
      console.log(`  Actor/Patient: ${decoded.actor}`);
      console.log(`  Decoded Type:  ${decoded.type}`);
    }
    console.log("==================================================================");
  } catch (error: any) {
    console.warn(" Failed to load events from RPC endpoint.");
    console.log(" Please ensure your local Soroban RPC node or Testnet is reachable.");
  }
}

checkEvents();
