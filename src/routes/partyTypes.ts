import { Router } from "express";
import { createPartyType, getAllPartyTypes } from "../controllers/partyTypes";

let router = Router();

router.get("/", async (req, res) => {
  let list = await getAllPartyTypes();
  res.status(200).send(list);
});
router.post("/", async (req, res) => {
  try{
    let {
        description,
        name
      } = req.body;
    
      let newEntry = await createPartyType({
        description,
        name
      });
    
      res.status(201).send(newEntry);
  } catch(err){
    res.status(500).send({
        error: `${err}`
    })
  }
});



export default router;
