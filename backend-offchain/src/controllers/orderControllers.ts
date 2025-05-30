import Order from "../models/Order";
import { User, SafeUser, IUser } from "../models/User";
import { Request, Response } from "express";

import * as bcrypt from "bcrypt"
import { IProduct, Product } from "../models/Product";

export const getOrder = async (req: Request, res: Response) => {
    //adjust according to frontend needs
    try{
        const order = await Order.findById( req.params.id )

        if(!order){
            res.status(400).json({msg: "Order not found"})
        }
        res.status(200).json({order})
    } catch(err:unknown){
        console.log(err)
        res.status(400).json({error:err})
    }
}

//ability to process multpled products from different farmers
export const createOrder = async (req: Request, res: Response) => {
    const { buyer, product, password } = req.body //expected information
    //cases to abort operation
    const user = await User.findOne({ email:buyer }) as IUser;
    const farmerExists: boolean = product?.farmer && await User.findById(product.farmer)

    if(!farmerExists || !user){
        res.status(400).json({error: "invalid users"})
        return;
    }

    const prod = await Product.findById(product._id)

    // const order = new Order({
    //     farmer: product.farmer,
    //     buyer:  user.id,
    //     product: [prod?.i
    //     totalPrice: 12,

    // })

    //get keypair; frontend should deal with extracting payment coin to maintaini decentralization
    //TODO
    //1.Get signer
    //2. Get utxos
    //3. Generate transaction with lucid and signerror"})
}

export const getAll = async (req: Request, res: Response) => {

}



// lucid.selectWallet.fromPrivateKey(privateKey);

// const address = await lucid.wallet().address(); // Bech32 encodedaddress

// import { Lucid, Koios, generateSeedPhrase } from "@lucid-evolution/lucid";
 
// // Initialize Lucid with a provider
// const lucid = await Lucid(
//   new Koios("https://preprod.koios.rest/api/v1"),
//   "Preprod"
// );
 
// const seedPhrase = generateSeedPhrase(); // BIP-39
// lucid.selectWallet.fromSeed(seedPhrase); // Select a wallet for signing
 
// // Build, sign and submit transaction
// const tx = await lucid
//   .newTx()
//   .pay.ToAddress("addr_testa...", { lovelace: 5000000n }) // Pay 5 ADA to addr_testa...
//   .pay.ToAddress("addr_testb...", { lovelace: 5000000n }) // Pay 5 ADA to addr_testb...
//   .complete(); // Balance the transaction and initiate UTxO selection
 
// const signedTx = await tx.sign.withWallet().complete();
// const txHash = await signedTx.submit();
 
// console.log("Transaction Submitted:", txHash);