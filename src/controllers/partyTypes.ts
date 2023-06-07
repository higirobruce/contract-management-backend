import PartyType from "../classes/partyTypes";
import { ExpiryActionModel } from "../models/expiryActions";
import { PartyTypeModel } from "../models/partyTypes";

export async function getAllPartyTypes() {
  try {
    let data = await PartyTypeModel.find();
    return data;
  } catch (err) {
    return err;
  }
}


export async function createPartyType(newEntry: PartyType){
  try{
      let createdEntry = await PartyTypeModel.create(newEntry)
      return createdEntry
  }catch(err){
      return err
  }
}

