"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyTypeModel = exports.MPartyType = void 0;
var mongoose_1 = require("mongoose");
exports.MPartyType = new mongoose_1.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    }
});
exports.PartyTypeModel = (0, mongoose_1.model)("PartyType", exports.MPartyType);
