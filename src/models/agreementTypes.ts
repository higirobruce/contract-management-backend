import { model, Schema } from "mongoose";
import AgreementType from "../classes/agreementTypes";

export const MAgreementType = new Schema<AgreementType>({
    description:{
        type: String
    },
    name:{
        type: String
    }
})

export const AgreementTypeModel = model<AgreementType>("AgreementType", MAgreementType);