import ExecutionStatus from "../classes/executionStatuses";
import { ExecutionStatusModel } from "../models/executionStatuses";

export async function getAllExecutionStatuses() {
  try {
    let data = await ExecutionStatusModel.find();
    return data;
  } catch (err) {
    return err;
  }
}

export async function createExecutionStatus(newEntry: ExecutionStatus){
  try{
      let createdEntry = await ExecutionStatusModel.create(newEntry)
      return createdEntry
  }catch(err){
      return err
  }
}
