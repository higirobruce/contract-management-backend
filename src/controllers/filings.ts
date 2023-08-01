import mongoose from "mongoose";
import Filing from "../classes/filings";
import { FilingModel, MFiling } from "../models/filings";
import { send } from "../utils/sendEmailNode";

export async function getAllFillings(organization: string, viewAll: any) {
  try {
    let query = {};
    if (viewAll !== "true") query = { organization };
    let data = await FilingModel.find(query)
      .populate("agreementType organization")
      .populate("partyType")
      .populate("statusOfExecution")
      .populate("actionOnExpiry")
      .populate("owner")
      .populate("collaborators")
      .populate("collaboratorComments.collaborator");

    return data;
  } catch (err) {
    return err;
  }
}
export async function getAllMyFillings(organization: String, id: string) {
  try {
    let data = await FilingModel.find({
      organization,
      $or: [{ collaborators: { $elemMatch: { $eq: id } } }, { owner: id }],
    })
      .populate("agreementType organization")
      .populate("partyType")
      .populate("statusOfExecution")
      .populate("actionOnExpiry")
      .populate("owner")
      .populate("collaborators")
      .populate("collaboratorComments.collaborator");

    return data;
  } catch (err) {
    return err;
  }
}

export async function getFillingById(id: String) {
  try {
    let data = await FilingModel.findById(id)
      .populate("agreementType organization")
      .populate("partyType")
      .populate("statusOfExecution")
      .populate("actionOnExpiry")
      .populate("owner")
      .populate("collaborators")
      .populate("collaboratorComments.collaborator");

    return data;
  } catch (err) {
    return err;
  }
}
export async function createFiling(filing: Filing) {
  try {
    let newFiling = await FilingModel.create(filing);
    let populatedFiling = FilingModel.populate(
      newFiling,
      "agreementType partyType statusOfExecution actionOnExpiry owner collaborators collaboratorComments.collaborator"
    ).then((v) => {
      return v;
    });

    send(
      "from",
      (await populatedFiling).collaborators.map((c: any) => c.email),
      "New File in CVL-CMS",
      JSON.stringify({
        file: { url: encodeURI(filing.docId), id: (await populatedFiling)._id },
      }),
      "html",
      "newFile"
    );

    return populatedFiling;
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function updateFiling(id: String, update: Filing) {
  try {
    let data = await FilingModel.findByIdAndUpdate(id, update, { new: true })
      .populate("agreementType organization")
      .populate("partyType")
      .populate("statusOfExecution")
      .populate("actionOnExpiry")
      .populate("owner")
      .populate("collaborators")
      .populate("collaboratorComments.collaborator");

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
