import mongoose from "mongoose";

export const phoneNumberSchema = new mongoose.Schema({
  countryCode: String,
  phone: String,
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

    status: String,

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
