
import { FilingModel } from "../models/filings";

export const generateFileNumber = async () => {
    // Get the last saved document
    const lastDocument = await FilingModel.findOne().sort({number: -1});
    // Generate a new 10-digit number, starting from 1000000000 and incrementing by 1
    let newNumber = 3000000000;
    if (lastDocument && lastDocument.number) {
      newNumber = lastDocument.number + 1;
    }
    
    // Return the new number
    return newNumber;
  }
  