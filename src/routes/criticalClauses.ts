import { Router } from "express";
import { createCriticalClause, getAllCriticalClauses } from "../controllers/criticalClauses";

let router = Router();

router.get("/", async (req, res) => {
  let list = await getAllCriticalClauses();
  res.status(200).send(list);
});

router.post("/", async (req, res) => {
  try{
    let {
        description,
        name
      } = req.body;
    
      let newEntry = await createCriticalClause({
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
