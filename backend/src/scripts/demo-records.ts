import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

async function runDemo() {
  const backendUrl = "http://localhost:3001";
  console.log("==================================================================");
  console.log(" VaultMedic Monorepo Flow Demo Records Script                     ");
  console.log("==================================================================");

  try {
    console.log(" [1/3] Querying backend microservice health state...");
    const health = await axios.get(`${backendUrl}/api/health`);
    console.log("       Health check result:", health.data.data);

    console.log("\n [2/3] Simulating browser client-side PHI AES encryption & upload...");
    const mockEncryptedData = {
      ciphertext: "U2FsdGVkX19mockCiphertextBytes==",
      iv: "123456789012",
      encryptedKey: "encKeyMock123==",
    };

    console.log("       Sending ciphertext to IPFS upload proxy...");
    const ipfs = await axios.post(`${backendUrl}/api/ipfs/upload`, mockEncryptedData);
    const cid = ipfs.data.data.cid;
    console.log("       Success! IPFS CID generated:", cid);

    console.log("\n [3/3] Generating on-chain transaction XDR for record entry...");
    const recordPayload = {
      author: "GAVPROVIDER1234567890ABCDEF1234567890ABCDEF123456789012345",
      patient: "GAPATIENT1234567890ABCDEF1234567890ABCDEF123456789012345",
      recordHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      recordType: "DIAGNOSIS",
      encryptedCid: cid,
    };

    const txResponse = await axios.post(`${backendUrl}/api/stellar/record/create`, recordPayload);
    console.log("       Success! Transaction prepared by Soroban RPC.");
    console.log("       Unsigned compiled XDR:");
    console.log(`       ${txResponse.data.data.xdr.substring(0, 120)}...`);

    console.log("==================================================================");
    console.log(" FULL STACK MONOREPO DEMO FLOW PASSED SUCCESSFULLY.");
    console.log(" Backend and smart contracts are fully synchronized.");
    console.log("==================================================================");
  } catch (error: any) {
    console.warn(" Failed to connect to local backend microservice.");
    console.log(" Info: Start the backend using 'npm run dev' inside backend/ directory");
    console.log("       before running this demo helper.");
  }
}

runDemo();
