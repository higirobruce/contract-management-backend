import mongoose, { model, Schema } from "mongoose";
import Filing from "../classes/filings";

let commentSchema = new Schema(
  {
    collaborator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

export const MFiling = new Schema<Filing>({
  actionOnExpiry: {
    type: mongoose.Types.ObjectId,
    ref: "ExpiryAction",
  },
  agreementType: {
    type: mongoose.Types.ObjectId,
    ref: "AgreementType",
  },
  comments: {
    type: String,
  },
  contractCommencement: {
    type: Date,
  },
  contractExpiration: {
    type: Date,
  },
  contractValue: {
    type: Number,
  },
  criticalClauses: [],
  number: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
  },
  partyType: {
    type: mongoose.Types.ObjectId,
    ref: "PartyType",
  },
  renewalTerms: {
    type: String,
  },
  docId: {
    type: String,
  },
  statusOfExecution: {
    type: mongoose.Types.ObjectId,
    ref: "ExecutionStatus",
  },
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  collaboratorComments: [
    {
      type: commentSchema,
    },
  ],
});

export const FilingModel = model<Filing>("Filing", MFiling);
