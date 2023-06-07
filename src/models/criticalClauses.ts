import { model, Schema } from "mongoose";
import CriticalClause from "../classes/criticalClauses";

export const MCriticalClause = new Schema<CriticalClause>({
    description:{
        type: String
    },
    name:{
        type: String
    }
})

export const CriticalClauseModel = model<CriticalClause>("CriticalClause", MCriticalClause);