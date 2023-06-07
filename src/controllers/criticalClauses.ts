import CriticalClause from "../classes/criticalClauses";
import { CriticalClauseModel } from "../models/criticalClauses";

export async function getAllCriticalClauses() {
  try {
    let data = await CriticalClauseModel.find();
    return data;
  } catch (err) {
    return err;
  }
}


export async function createCriticalClause(newEntry: CriticalClause){
  try{
      let createdEntry = await CriticalClauseModel.create(newEntry)
      return createdEntry
  }catch(err){
      return err
  }
}

