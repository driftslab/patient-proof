import { Keypair } from "@stellar/stellar-sdk";

export function generateKeypair() {
  const kp = Keypair.random();
  console.log("==================================================================");
  console.log(" VaultMedic Stellar/Soroban Keypair Generation Utility            ");
  console.log("==================================================================");
  console.log(` Public Key (G...):  ${kp.publicKey()}`);
  console.log(` Secret Key (S...):  ${kp.secret()}`);
  console.log("==================================================================");
  console.log(" IMPORTANT: Keep the secret key confidential and do not share it. ");
  console.log(" Save these in your development .env config files before building.");
  console.log("==================================================================");
}

generateKeypair();
