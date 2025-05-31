import Order from "../models/Order";
import { User, SafeUser, IUser } from "../models/User";
import { Request, Response } from "express";

import { IProduct, Product } from "../models/Product";
import { Certificate } from "../models/Certificate";
import { initLucid, mintToken } from "../utils/callmint";

const development = process.env.NODE_ENV === "development"

//demo endpoint for the creation of verified certificate
export const createCertificate = async (req: Request, res: Response) => {
    try {
        const { farmer, farmName: name, location, cropType: type, certified, quantity } = req.body

        let user = await User.findById(farmer)
        if(!user){
            user = await User.findById("683a1b0494e7a70f9d3067dd")
        }
        //mint NFT and get ID
        //
        const certificate = new Certificate({
            farmer: user ? user._id : "683a1b0494e7a70f9d3067dd",
            name,
            location,
            type,
            quantity: quantity ? quantity : 200,
            certified: certified ? true : false,
        })
        await certificate.save()
        res.status(200).json({certificate})
        return
    } catch(error){
        if(development){
            console.log(error)
            res.status(500).json({error:"could not create certificate"})
        }
    }
}


//all of these endpoints have been overhauled in favor of the verification system. 

export const getAllCertificates = async (req: Request, res: Response) => {
    //adjust according to frontend needs
    try{
        // const order = await Order.findById( req.params.id )
        const certificates = await Certificate.find().populate("farmer")
        res.status(200).json(certificates)
    } catch(err:unknown){
        console.log(err)
        res.status(400).json({error:err})
    }
}

function getRandomID(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const certifyCertificate = async(req: Request, res: Response) => {
    try {
        const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!certificate){ res.status(400).json({error:"no certificate found"}); return }
        const user = await User.findById(certificate.farmer)
        const lucid_provider = await initLucid()

        if (!req.body.certified){
            const chain = "rejected"
            res.status(200).json({ msg: "certificate rejected", chain })
            return
        }
        const tokenName = `NFT-00${getRandomID(1, 9)}`
        const hash = await mintToken(
            lucid_provider,
            user?.privateKey!,
            user?.cardanoWalletAddress!,
            tokenName   
        )
        await Certificate.findByIdAndUpdate(certificate._id, {
            tokenName,
            chainId: hash ? hash : ""
        })
        const chain = hash ? hash : "not enough funds"
        res.status(200).json({ msg: "certificate certified", chain })
    }catch(error){
        res.status(500).json({error:"could not create certificate"})
    }
}

export const updateCertificate = async (req: Request, res: Response) => {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!certificate){
        res.status(400).json({error:"certificate not found"})
    }
}