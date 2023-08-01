import { Router } from "express";
import {
  createFiling,
  getAllFillings,
  getAllMyFillings,
  getFillingById,
  updateFiling,
} from "../controllers/filings";
import { FilingModel } from "../models/filings";
import { generateFileNumber } from "../services/fillings";
import { send } from "../utils/sendEmailNode";

let router = Router();

router.get("/", async (req, res) => {
  let { organization } = req.headers;
  if (organization) {
    let allFilings = await getAllFillings(organization as string);
    res.status(200).send(allFilings);
  } else {
  }
});

router.get("/download", async (req, res) => {
  let { organization } = req.headers;
  if (organization) {
    let allFilings = await getAllFillings(organization as string);
    res.status(200).send(allFilings);
  } else {
  }
});

router.get("/my-filings/:id", async (req, res) => {
  let { id } = req.params;
  let { organization } = req.headers;
  let allFilings = await getAllMyFillings(organization as string, id);
  res.status(200).send(allFilings);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let allFilings = await getFillingById(id);
  if (!allFilings) res.status(404).send();
  else {
    res.status(200).send(allFilings);
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      name,
      description,
      partyType,
      agreementType,
      statusOfExecution,
      contractCommencement,
      contractExpiration,
      contractValue,
      criticalClauses,
      renewalTerms,
      comments,
      actionOnExpiry,
      docId,
      owner,
      collaborators,
      collaboratorComments,
      organization,
    } = req.body;

    let newFilingNumber = await generateFileNumber();

    let newFiling = await createFiling({
      name,
      description,
      number: newFilingNumber,
      partyType,
      agreementType,
      statusOfExecution,
      contractCommencement,
      contractExpiration,
      contractValue,
      criticalClauses,
      renewalTerms,
      comments,
      actionOnExpiry,
      docId,
      owner,
      collaborators,
      collaboratorComments,
      organization,
    });

    res.status(201).send(newFiling);
  } catch (err) {
    res.status(500).send({
      error: `${err}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { updates, justAComment, newComment } = req.body;

  let newFile = await updateFiling(id, updates);
  if (newFile) {
    if (justAComment) {
      let populatedFiling = FilingModel.populate(
        newFile,
        "agreementType partyType statusOfExecution actionOnExpiry owner collaborators collaboratorComments.collaborator"
      ).then((v) => {
        return v;
      });

      send(
        "from",
        (await populatedFiling).collaborators.map((c: any) => c.email),
        "Updates - comments on a File",
        JSON.stringify({
          comment: newComment,
          file: {
            url: encodeURI((await populatedFiling).docId),
            id: (await populatedFiling)._id,
          },
        }),
        "html",
        "comment"
      );
    }

    res.status(201).send(newFile);
  } else {
    res.status(404).send();
  }
});

export default router;
