import { model, Schema } from "mongoose";
import Contract from "../classes/contract";

export const MContract = new Schema<Contract>({

})

export const ContractModel = model<Contract>("Contract", MContract);