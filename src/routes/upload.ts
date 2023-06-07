import multer, { diskStorage } from "multer";
import { Router } from "express";
import fs from "fs";

export let uploadRouter = Router();

uploadRouter.post("/", (req, res) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/files");
    },
    filename: function (req, file, cb) {
      let nameSplits = file.originalname.split('.')
      let name = file.originalname.split('.')[0]
      let extension = file.originalname.split('.')[nameSplits.length-1]
      cb(null, name+Date.now()+'.'+extension);
    },
  });


  var upload = multer({ storage: storage }).single("file");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500);
    } else if (err) {
      console.log(err);
      return res.status(500);
    }

    return res.status(200).send(req.file);
  });
});



uploadRouter.get("/:path", (req, res) => {
  let {path} = req.params

  fs.stat(`public/termsOfReference/${path}`, (err, stats) => {
    if(err) res.send({err})
    if(stats) res.send({stats})
  });
});
