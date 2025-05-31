 //file that connects to the Cardano Preprod testnet using Blockfrost, and calls a smart contract to mint a token (native token or NFT) for a user.
import { Lucid, Blockfrost, fromText } from "lucid-cardano";
import "dotenv/config";

// Load your Blockfrost API key from .env
const BLOCKFROST_API_KEY = process.env.BLOCKFROST_PREPROD_API_KEY!;
const NETWORK = "Preprod";

// Initialize Lucid for Preprod
export async function initLucid(): Promise<Lucid> {
  return await Lucid.new(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", BLOCKFROST_API_KEY),
    NETWORK
  );
}

// Function to mint a token (replace with smart contract logic if needed)
export async function mintToken(
  lucid: Lucid,
  privateKey: string,
  receiverAddress: string,
  tokenName: string,
  quantity: bigint = 1n
): Promise<string> {
  // Select wallet from private key
  await lucid.selectWalletFromPrivateKey(privateKey);

  // Create a simple minting policy (1-time signature-based)
  const policy = lucid.utils.nativeScriptFromJson({
    type: "sig", 
    keyHash: lucid.utils.keyHash(await lucid.wallet.address()),
  });
  const policyId = lucid.utils.scriptHash(policy);
  const assetName = fromText(tokenName);
  const unit = policyId + assetName;

  // Build minting transaction
  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: quantity }, policy)
    .payToAddress(receiverAddress, { [unit]: quantity })
    .complete();

  // Sign and submit transaction
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  return txHash;
}

// Example usage
(async () => {
  const lucid = await initLucid();

  const PRIVATE_KEY = "your-private-key"; // Bech32 or Hex format
  const RECEIVER_ADDRESS = "addr_test1..."; // Preprod wallet address
  const TOKEN_NAME = "MyTestToken";

  const txHash = await mintToken(lucid, PRIVATE_KEY, RECEIVER_ADDRESS, TOKEN_NAME);
  console.log("Minted token in transaction:", txHash);
})();
