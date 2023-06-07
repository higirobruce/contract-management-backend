"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filing = /** @class */ (function () {
    function Filing(number, partyType, agreementType, statusOfExecution, contractCommencement, contractExpiration, contractValue, criticalClauses, renewalTerms, comments, actionOnExpiry, docId) {
        this.number = number;
        this.partyType = partyType;
        this.agreementType = agreementType;
        this.statusOfExecution = statusOfExecution;
        this.contractCommencement = contractCommencement;
        this.contractExpiration = contractExpiration;
        this.contractValue = contractValue;
        this.criticalClauses = criticalClauses;
        this.renewalTerms = renewalTerms;
        this.comments = comments;
        this.actionOnExpiry = actionOnExpiry;
        this.docId = docId;
    }
    return Filing;
}());
exports.default = Filing;
