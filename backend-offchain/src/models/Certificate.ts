import mongoose, { Document, Schema } from "mongoose";


interface ICertificate extends Document{
    farmer: mongoose.Types.ObjectId;
    location: string;
    type: string;
    SON?: boolean;
    verified?: boolean;
    chainId?: string;
}

const CertificateSchema = new Schema<ICertificate>({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, },
    type: { type: String },
    SON: { type: Boolean },
    verified: { type: Boolean },
    chainId: { type: String } //Order transaction hash on-chain
}, { timestamps: true })

export const Certificate = mongoose.model<ICertificate>("Order", CertificateSchema)
