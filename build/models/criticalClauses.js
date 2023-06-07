"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriticalClauseModel = exports.MCriticalClause = void 0;
var mongoose_1 = require("mongoose");
exports.MCriticalClause = new mongoose_1.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    }
});
exports.CriticalClauseModel = (0, mongoose_1.model)("CriticalClause", exports.MCriticalClause);
