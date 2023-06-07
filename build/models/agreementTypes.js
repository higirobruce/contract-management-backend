"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementTypeModel = exports.MAgreementType = void 0;
var mongoose_1 = require("mongoose");
exports.MAgreementType = new mongoose_1.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    }
});
exports.AgreementTypeModel = (0, mongoose_1.model)("AgreementType", exports.MAgreementType);
