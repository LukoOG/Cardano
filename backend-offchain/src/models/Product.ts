import mongoose, {Document, Schema} from "mongoose";

const categories =[
    "staple",
    "cash",
    "others",
] as const;

type Review = {
    user: string,
    review: string,
}

const status = [
    'pending',
    'certified',
] as const

export interface IProduct extends Document{
    //records for demo purpose
    _id: mongoose.Types.ObjectId;
    name: string;
    farmer: mongoose.Types.ObjectId;
    price: number;
    description?: string;
    location?: string;
    certifiedBy?: string;
    nftID?: string;
    status: typeof status[number]



    // category: typeof categories[number];
    // weight: number;
    // stock: number;
    // imgUrl?: string[];
    // available: boolean;
    // rating: number;
    // reviews?: Review[];
    // relatedCommodities?: string[];
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //reference to the farmer
    price: { type: Number, required: true, default:0 },
    description: { type: String },
    location: { type: String },
    certifiedBy: { type: String },
    nftID: { type: String },
    status: { type: String, enum:status, default:'pending' },


    // category: { type: String, enum: categories, required:true },
    // weight: { type: Number, required:true },
    // stock: { type: Number, required:true },
    // imgUrl: { type: [String] },
    // available: { type: Boolean, required:true, default:true},
    // rating: { type: Number, default:0 },
    // reviews: [
    //     {type: {
    //     naqme: String,
    //     review: String,
    // }}
    // ],
    // relatedCommodities: {type: [String]}
})

export const Product = mongoose.model<IProduct>("Product", ProductSchema)