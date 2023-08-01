import mongoose from "mongoose";

export const phoneNumberSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    default: '+250'
  },
  phone: String,
});

export const permissionsSchema = new mongoose.Schema({
  canViewFiles: { type: Boolean, default: false },
  canCreateFiles: { type: Boolean, default: false },
  canEditFiles: { type: Boolean, default: false },
  canCreateUsers: { type: Boolean, default: false },
  canEditUsers: { type: Boolean, default: false },
  canViewUsers: { type: Boolean, default: false },
  canCreateMasterData: { type: Boolean, default: false },
  canEditMasterData: { type: Boolean, default: false },
  canViewMasterData: { type: Boolean, default: false },
});

export const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    permissions: permissionsSchema,
    email: {
      type: String,
      required: true,
      dropDups: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    password: String,

    profilePictureUrl: String,

    status: {
      type: String,
      defaul: 'active'
    },

    phoneNumber: {
      type: phoneNumberSchema,
    },
    organizations: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Company",
          required: true,
        },
      ],
    },
  },
  { timestamps: true, strict: true }
);

export const userModel = mongoose.model("users", userSchema);
