import { model, Schema } from "mongoose";
import ExecutionStatus from "../classes/executionStatuses";

export const MExecutionStatus = new Schema<ExecutionStatus>({
    description:{
        type: String
    },
    name:{
        type: String
    }
})

export const ExecutionStatusModel = model<ExecutionStatus>("ExecutionStatus", MExecutionStatus);