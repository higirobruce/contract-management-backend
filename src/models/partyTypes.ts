import { model, Schema } from "mongoose";
import PartyType from "../classes/partyTypes";

export const MPartyType = new Schema<PartyType>({
    description:{
        type: String
    },
    name:{
        type: String
    }
})

export const PartyTypeModel = model<PartyType>("PartyType", MPartyType);