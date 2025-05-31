import mongoose, { Document, Schema } from "mongoose";

const status = [
    'pending',
    'certified',
    'rejected',
] as const

interface ICertificate extends Document{
    farmer: mongoose.Types.ObjectId;
    name: string;
    location: string;
    type: string;
    quantity: number;
    certified?: boolean;
    certifiedBy?: string;
    nftID?: string;
    status: typeof status[number]
    chainId?: string;
    storageId?: string;
}

const CertificateSchema = new Schema<ICertificate>({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, },
    location: { type: String, },
    type: { type: String },
    quantity: { type: Number },
    certified: { type: Boolean, default: false},
    certifiedBy: { type: String },
    nftID: { type: String },
    status: { type: String, enum:status, default:'pending' },
    chainId: { type: String }, //Order transaction hash on-chain
    storageId: { type: String },
}, { timestamps: true })

export const Certificate = mongoose.model<ICertificate>("Certificate", CertificateSchema)
