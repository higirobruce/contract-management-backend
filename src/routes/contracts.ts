import { Router } from "express";
import { ContractModel } from "../models/contracts";

let router = Router();

router.get('/', async (req,res)=>{
    let allContracts = await ContractModel.find()
    res.status(200).send(allContracts)
})

export default router;