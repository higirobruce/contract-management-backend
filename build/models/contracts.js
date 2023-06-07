"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModel = exports.MContract = void 0;
var mongoose_1 = require("mongoose");
exports.MContract = new mongoose_1.Schema({});
exports.ContractModel = (0, mongoose_1.model)("Contract", exports.MContract);
