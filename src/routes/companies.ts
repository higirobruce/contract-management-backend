import { Router } from "express";
import { CompanyModel } from "../models/companies";
import { generateCompanyNumber } from "../services/companies";

let router = Router();

router.get("/", async (req, res) => {
  let alCompanies = await CompanyModel.find();
  res.status(200).send(alCompanies);
});

router.post("/", async (req, res) => {
  try {
    let number = await generateCompanyNumber();
    let comp = new CompanyModel({...req.body, number});
    let newCompany = await comp.save();
    res.status(201).send({ newCompany });
  } catch (err) {}
});

export default router;
