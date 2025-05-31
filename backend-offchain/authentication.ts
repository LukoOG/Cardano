import express from 'express'
// import express from 'express';
import { Lucid, Blockfrost, Address } from '@lucid-evolution/lucid';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let lucid: any;

async function initLucid() {
  lucid = await Lucid(
    new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetKFquTwmuxJxUrRdDP3zHQCOkXqMDr8fz"),
    "Mainnet"
  );
}

initLucid();

app.post('/auth/tx', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    res.status(400).json({ error: "Missing walletAddress" });
    return;
  }

  try {
    const tx = await lucid
      .newTx()
      .payToAddress(walletAddress, { lovelace: BigInt(1000000) }) // 1 ADA dummy tx
      .complete();

    const txCbor = tx.toString(); // Convert transaction to CBOR

    res.json({ txCbor });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ error: "Failed to build transaction" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
