import { Request, Response } from "express";
import crypto from  "crypto"

import { User, IUser, SafeUser } from "../models/User";
import { startSession, Error } from "mongoose"

import * as bcrypt from "bcrypt"
import * as bip39 from "bip39"
import * as jwt from "jsonwebtoken"
import { Lucid, fromHex, toHex } from "@lucid-evolution/lucid";
import { generateCardanoWallet } from "../utils/wallet"
import { encryptMnemonic } from "../utils/wallet_mnemonics";




import "dotenv/config";
import { Farm } from "../models/Farm";


const development = process.env.NODE_ENV === 'development'

export const register = async (req: Request, res: Response) => {
    const session = await startSession();
    try{
        // const { name, email, password, role }= req.body
        const { firstName, lastName, email, phoneNumber, password, role, nin, state, address } = req.body;

        if(!email || !password){
            await session.endSession();
            res.status(400).json({ msg: "Email and password are required" });
            return;
        }

        let existingUser = await User.findOne({ email }).session(session);
        if (existingUser){ 
            await session.endSession();
            res.status(400).json({ msg: "User already exists" });
            return;
        };

        
        //hashing the password
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        //generating user wallet details
        // npm i @emurgo/cardano-serialization-lib-nodejs

        const { ticker, address: cardanoWalletAddress, privateKey, mnemonic } = await generateCardanoWallet()

        //other definitions
        const fullname = `${firstName} ${lastName}`
        const location = {
            home: address,
            state: state
        }

        const userData = new User({
            name: fullname,
            email,
            phone: phoneNumber,
            password: hashedPassword,
            role,
            NIN: nin,
            location,
            mnemonic: encryptMnemonic(mnemonic, password), //store the encrypted mnemonic
            privateKey, //to allow easier reconstrucion of the wallet keypair on the frontend for demo purposes
                        //will deprecate and update to derive keypair from encrypted mnemonic
            imgUrl: "https://res.cloudinary.com/dfxieiol1/image/upload/v1748355861/default-pici_rxkswj.png", //default profile picture
            cardanoWalletAddress,
            farms: role === "farmer" ? [] : null
        });
        
        
        
        session.startTransaction();
        const newUser = await userData.save({ session });
        
        //Saving the farm if the user is a farmer
        if(role === "farmer"){
            const { type, size, address,  } = req.body.farm
            const farm = await new Farm({
                type,
                size,
                crops: req.body.farm.crops || [],
                location: address,
                farmer: newUser._id,    
            }).save({ session })
            
            await User.findByIdAndUpdate(
                newUser._id,
                { $push: { farms: farm._id } },
                { session }
            );
        }

        await session.commitTransaction()
        
        //generate jwt-token
        let userObj: SafeUser = newUser.toJSON()
        const payload = { user: userObj };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: "7d" });
    
        res.json({ token})//, mnemonic });
        
    } catch(error){
        if(development){
            console.log("this is the: ",error);
        }

        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        if (error instanceof Error.ValidationError) {
            res.status(400).json({ error: error.message });
            return;
        } else{
        res.status(500).json({
            error:"Registeration failed",
            details: development ? error : undefined
        })

        }

    } finally {
        await session.endSession()
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body
        
        //get the user
        const user = await User.findOne({email}) as IUser
        if (!user)  res.status(400).json({ msg: "User does not exist" });

        //check password
        const isMatch = bcrypt.compare(password, user.password as string)
        if (!isMatch)  res.status(400).json({ msg:"Invalid credentials" })

        let userObj = user.toJSON() as SafeUser
        
        //generate token  
        const payload = { user: userObj };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,  // Set to true in production (requires HTTPS)
            sameSite: "none",
            maxAge: 3600000, // 1 hour
        });


        res.status(200).json({token})

    }catch(error){
        console.log(error)
        res.status(500).send("Server error");
    }
}

export const updateProfile = async (req:Request, res:Response) => {
    try{
        // console.log(req)
        if (req.file && req.file.path){
            req.body.imgUrl = req.file.path
        }
        
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updated) {res.status(400).json({error:"no user found"}); return}
        res.status(200).json({msg:"user profile updated", user:updated})
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error})
    }
}


export const refresh_token = async () => {

}

//development testing. Sending keypair bytes
//bad practice. Keypair derivation will happen client-side

export const getmnemonic = async (req: Request, res:Response) => {
    try{
        const { email, password } = req.body

        //get the user
        const user = await User.findOne({email}) as IUser
        if (!user){
            res.status(400).json({ msg: "User does not exist" })
            return;
        };
        
        const isMatch = bcrypt.compare(password, user.password as string)
        if (!isMatch){
            res.status(400).json({ msg:"Invalid credentials" })
            return;
        }

        const mnemonic = user.mnemonic
        res.status(200).json({mnemonic})
        return
    } catch(error){
        res.status(500).json({error:"error getting user keypair"})
        console.log(error)
    }
}

type OauthPayload = {
    provider: string,
    sub: string,
    aud: string,
    [key: string]: any // for all the other JWT fields
}

export const generateSalt =  (): string => {
    const buf = crypto.randomBytes(16);
    const salt = BigInt('0x' + buf.toString('hex'));
    return salt.toString(); // decimal string
}

const signTransaction = async () => {

}