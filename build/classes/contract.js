"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = /** @class */ (function () {
    function Contract(number, sections, status, commencement, expiry, signatories, docId) {
        this.number = number;
        this.sections = sections;
        this.status = status;
        this.commencement = commencement;
        this.expiry = expiry;
        this.signatories = signatories;
        this.docId = docId;
    }
    return Contract;
}());
exports.default = Contract;
