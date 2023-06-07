import ExpiryAction from "../classes/expiryActions";
import { ExpiryActionModel } from "../models/expiryActions";

export async function getAllExpiryActions() {
  try {
    let data = await ExpiryActionModel.find();
    return data;
  } catch (err) {
    return err;
  }
}

export async function createExpiryAction(newEntry: ExpiryAction){
  try{
      let createdEntry = await ExpiryActionModel.create(newEntry)
      return createdEntry
  }catch(err){
      return err
  }
}


