"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("./utils/logger");
var contracts_1 = __importDefault(require("./routes/contracts"));
var filings_1 = __importDefault(require("./routes/filings"));
var agreementTypes_1 = __importDefault(require("./routes/agreementTypes"));
var criticalClauses_1 = __importDefault(require("./routes/criticalClauses"));
var executionStatuses_1 = __importDefault(require("./routes/executionStatuses"));
var expiryActions_1 = __importDefault(require("./routes/expiryActions"));
var partyTypes_1 = __importDefault(require("./routes/partyTypes"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_ts_1 = __importDefault(require("cors-ts"));
var app = (0, express_1.default)();
var PORT = process.env.CONTRACT_APP_PORT || 4000;
var DB_USER = process.env.CONTRACT_APP_DB_USER;
var DB_PASSWORD = process.env.CONTRACT_APP_DB_PASSWORD;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Set up default mongoose connection
var mongoDB = "mongodb://".concat(DB_USER, ":").concat(DB_PASSWORD, "@127.0.0.1:27017/contractApp?authSource=admin");
mongoose_1.default.connect(mongoDB);
var db = mongoose_1.default.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () { return console.log("connected to db"); });
//Basic Authorization
var auth = function (req, res, next) {
    var auth = {
        login: "c0NTRaktApp2023",
        password: "50d0cd02-d20c-11ed-afa1-0242ac120002",
    }; // change this
    // const auth = {
    //   login: process.env.CONS_API_USER,
    //   password: process.env.CONS_API_PASS,
    // }; // change this
    var b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    var _a = Buffer.from(b64auth, "base64")
        .toString()
        .split(":"), login = _a[0], password = _a[1];
    if (login && password && login === auth.login && password === auth.password) {
        return next();
    }
    logger_1.logger.log({
        level: "error",
        message: "Unauthorized API access was declined.",
        payload: req.baseUrl,
    });
    res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
    res.status(401).send("Authentication required."); // custom message
};
app.use((0, cors_ts_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/contracts", auth, contracts_1.default);
app.use("/filings", filings_1.default);
app.use("/agreementTypes", agreementTypes_1.default);
app.use("/criticalClauses", criticalClauses_1.default);
app.use("/executionStatuses", executionStatuses_1.default);
app.use("/expiryActions", expiryActions_1.default);
app.use("/partyTypes", partyTypes_1.default);
app.listen(PORT, function () {
    logger_1.logger.log({
        level: "info",
        message: "App running on port ".concat(PORT),
    });
    console.log("App running on port ".concat(PORT));
});
