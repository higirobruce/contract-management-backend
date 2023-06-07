import { model, Schema } from "mongoose";
import ExpiryAction from "../classes/expiryActions";

export const MExpiryAction = new Schema<ExpiryAction>({
    description:{
        type: String
    },
    name:{
        type: String
    }
})

export const ExpiryActionModel = model<ExpiryAction>("ExpiryAction", MExpiryAction);