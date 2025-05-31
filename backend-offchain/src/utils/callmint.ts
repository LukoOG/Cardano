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
  console.log("picking wallet")
  lucid.selectWallet.fromPrivateKey(privateKey)
  
  // Create a simple minting policy (1-time signature-based)
  console.log("building script")
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


//testing the mint. Comment out in production

// Example usage
// (async () => {
// try {  const lucid = await initLucid();

//   const PRIVATE_KEY = "xprv13rxjk62mslqaxvaxdyxpr2j8xcrl88ks2pxw2nvunn58d6e4waxy9rjlvmqz4pf5ms5nqu4yn20rvk9wy5sf6mj3ms60h4dyah3xjkj8xnr8589w7t9el9vw6utm44vnujda96rzy9kmtmeh7su3eshdyssmhvr5"; // Bech32 or Hex format
//   const RECEIVER_ADDRESS = "addr_test1qr2fmqlr2q47zhums0550mw4xtffszwkeu2cqrgdd5m5n5jw7wvxzjm4nssrm5rwjur9suc469p584hvgn9s29jy8npq9q078k"; // Preprod wallet address
//   const TOKEN_NAME = "MyTestToken";
//   // const bech_priv = privateKeyToBech32(PRIVATE_KEY)
//   // console.log(bech_priv)

//   const txHash = await mintToken(lucid, PRIVATE_KEY, RECEIVER_ADDRESS, TOKEN_NAME);
//   console.log("Minted token in transaction:", txHash);} catch(error){
//     console.log(error)
//   }
// })();
