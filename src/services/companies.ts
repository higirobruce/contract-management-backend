
import { CompanyModel } from "../models/companies";

export const generateCompanyNumber = async () => {
    // Get the last saved document
    const lastDocument = await CompanyModel.findOne().sort({number: -1});
    // Generate a new 10-digit number, starting from 1000000000 and incrementing by 1
    let newNumber = 1000;
    if (lastDocument && lastDocument.number) {
      newNumber = lastDocument.number + 500;
    }
    
    // Return the new number
    return newNumber;
  }
  