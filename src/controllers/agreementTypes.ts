import AgreementType from "../classes/agreementTypes";
import { AgreementTypeModel } from "../models/agreementTypes";

export async function getAllAgreementTypes() {
  try {
    let data = await AgreementTypeModel.find();
    return data;
  } catch (err) {
    return err;
  }
}

export async function createAgreementType(agreementType: AgreementType){
    try{
        let newAgreementType = await AgreementTypeModel.create(agreementType)
        return newAgreementType
    }catch(err){
        return err
    }
}
