 //file that connects to the Cardano Preprod testnet using Blockfrost, and calls a smart contract to mint a token (native token or NFT) for a user.
import { 
  Lucid, 
  Blockfrost, 
  fromText, 
  LucidEvolution, 
  paymentCredentialOf, 
  scriptFromNative,
  mintingPolicyToId
} from "@lucid-evolution/lucid";

import { PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

import "dotenv/config";

// Load your Blockfrost API key from .env
const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY!;
const NETWORK = "Preprod";

// Initialize Lucid for Preprod
export async function initLucid() {
  return await Lucid(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", BLOCKFROST_API_KEY),
    NETWORK
  );
}

// Function to mint a token (replace with smart contract logic if needed)
export async function mintToken(
  lucid: LucidEvolution,
  privateKey: string,
  receiverAddress: string,
  tokenName: string,
  quantity: bigint = 1n
): Promise<string> {
  // Select wallet from private key
  lucid.selectWallet.fromPrivateKey(privateKey)

  // Create a simple minting policy (1-time signature-based)
  const policy = scriptFromNative({
    type: "sig", 
    keyHash: paymentCredentialOf(await lucid.wallet().address()).hash ,
  });
  const policyId = mintingPolicyToId(policy);
  const assetName = fromText(tokenName);
  const unit = policyId + assetName;

  // Build minting transaction
  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: quantity })
    .pay.ToAddress(receiverAddress, { [unit]: quantity })
    .attach.MintingPolicy(policy)
    .complete();

  // Sign and submit transaction
  const signedTx = await tx.sign.withWallet().complete();
  const txHash = await signedTx.submit();

  return txHash;
}

function privateKeyToBech32(privateKeyHex: string): string {
  const pk = PrivateKey.from_normal_bytes(Buffer.from(privateKeyHex, "hex"));
  return pk.to_bech32(); // returns `ed25519_sk...`
}

// Example usage
// (async () => {
//   const lucid = await initLucid();

//   const PRIVATE_KEY = "60e378da5d918281d49d1710587c1c0c895469cecb96c319ccac097c5d3925536e20bd420cbb6dd395c3280a06b9b1d3fa816924387017cee858da54237afd06"; // Bech32 or Hex format
//   const RECEIVER_ADDRESS = "addr1qxtk26g6x4f2uldjn8eenyqy73hg5q7tj93pffd2ru80jvqhv0fljw3q6darskalpwppllk0jfae2tcmrefcfwn35x7qea7kkk"; // Preprod wallet address
//   const TOKEN_NAME = "MyTestToken";
//   const bech_priv = privateKeyToBech32(PRIVATE_KEY)
//   console.log(bech_priv)

//   const txHash = await mintToken(lucid, bech_priv, RECEIVER_ADDRESS, TOKEN_NAME);
//   console.log("Minted token in transaction:", txHash);
// })();
