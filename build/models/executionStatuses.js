"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionStatusModel = exports.MExecutionStatus = void 0;
var mongoose_1 = require("mongoose");
exports.MExecutionStatus = new mongoose_1.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    }
});
exports.ExecutionStatusModel = (0, mongoose_1.model)("ExecutionStatus", exports.MExecutionStatus);
