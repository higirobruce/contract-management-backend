"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiryActionModel = exports.MExpiryAction = void 0;
var mongoose_1 = require("mongoose");
exports.MExpiryAction = new mongoose_1.Schema({
    description: {
        type: String
    },
    name: {
        type: String
    }
});
exports.ExpiryActionModel = (0, mongoose_1.model)("ExpiryAction", exports.MExpiryAction);
