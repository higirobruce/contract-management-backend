import { model, Schema } from "mongoose";
import Company from "../classes/company";

export const MCompany = new Schema<Company>({
    name:{
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },
})

export const CompanyModel = model<Company>("Company", MCompany);