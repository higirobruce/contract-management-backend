import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { logger } from "./utils/logger";
import contractRouter from "./routes/contracts";
import filingRouter from "./routes/filings";
import usersRouter from "./routes/users";
import agreementTypesRouter from "./routes/agreementTypes";
import criticalClausesRouter from "./routes/criticalClauses";
import executionStatusesRouter from "./routes/executionStatuses";
import expiryActionsRouter from "./routes/expiryActions";
import partyTypesRouter from "./routes/partyTypes";
import {uploadRouter} from './routes/upload'

import bodyParser from "body-parser";
import cors from "cors-ts";
import path from "path";

import cron from 'node-cron'
import { getFilesToExpireinOneMonth, getFilesToExpireinOneWeek } from "./utils/cron-funtions";

let app = express();

let PORT = process.env.CONTRACT_APP_PORT || 4000;
const DB_USER = process.env.CONTRACT_APP_DB_USER;
const DB_PASSWORD = process.env.CONTRACT_APP_DB_PASSWORD;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Set up default mongoose connection
var mongoDB = `mongodb://${DB_USER}:${DB_PASSWORD}@127.0.0.1:27017/contractApp?authSource=admin`;

mongoose.connect(mongoDB);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => console.log("connected to db"));

//Basic Authorization
let auth = (req: Request, res: Response, next: NextFunction) => {
  const auth = {
    login: "c0NTRaktApp2023",
    password: "50d0cd02-d20c-11ed-afa1-0242ac120002",
  }; // change this
  // const auth = {
  //   login: process.env.CONS_API_USER,
  //   password: process.env.CONS_API_PASS,
  // }; // change this
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  logger.log({
    level: "error",
    message: `Unauthorized API access was declined.`,
    payload: req.baseUrl,
  });
  res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
  res.status(401).send("Authentication required."); // custom message
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/contracts", auth, contractRouter);
app.use("/filings", filingRouter);
app.use("/agreementTypes", agreementTypesRouter);
app.use("/criticalClauses", criticalClausesRouter);
app.use("/executionStatuses", executionStatusesRouter);
app.use("/expiryActions", expiryActionsRouter);
app.use("/partyTypes", partyTypesRouter);
app.use("/uploads", uploadRouter);
app.use("/users", usersRouter);

app.get("/file/:folder/:name", function (req, res, next) {
  var folder = req.params.folder;
  var options = {
    root: path.join(__dirname, "../public/", folder),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next("File not found! 😏");
    } else {
    }
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
 
  cron.schedule("21 15 * * *", () => {
    console.log(
    'sending...'
    )

    getFilesToExpireinOneWeek().then(res=>{

    }).catch(err=>{
      console.log(err)
    })

    getFilesToExpireinOneMonth().then(res=>{

    }).catch(err=>{
      console.log(err)
    })
    
  });
});
