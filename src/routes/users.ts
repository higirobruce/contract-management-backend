import mongoose from "mongoose";
import { Router } from "express";

import passAuth from "passport-google-oauth2";
import passportLocal = require("passport-local");
import passport, { PassportStatic } from "passport";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import otp from "otp-generator";
import { userModel } from "../models/user";
import { send } from "../utils/sendEmailNode";
import jwt, { Secret } from "jsonwebtoken";

let SALT = process.env.TOKEN_SALT || "968d8b95-72cd-4470-b13e-1017138d32cf";

let userRouter = Router();

let GoogleStrategy = passAuth.Strategy;
let LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user: any, cb:any) {
  process.nextTick(function () {
    return cb(null, user);
  });
});



userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel
      .find();
    res.send({ users });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

userRouter.get("/byId/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await userModel
      .findOne({ _id: id });
    res.send({ user });
  } catch (err) {
    res.send({ err });
  }
});

userRouter.get("/byCompany/", async (req, res) => {
  let { organization } = req.headers;
  if (!organization)
    res
      .status(404)
      .send({ errorMessage: "No organization found in the header" });
  else {
    try {
      let user = await userModel
        .find({ organizations: organization });
      res.send({ user });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
});

userRouter.post("/signup", async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    profilePictureUrl,
    status,
    phoneNumber,
  } = req.body;
  try {
    let c = new userModel({
      
      firstName,
      lastName,
      email,
      password: password?hashPassword(password):'',
      profilePictureUrl,
      status,
      phoneNumber,
    });
    let newuser = await c.save();

    let token = jwt.sign(
      {
        email: newuser.email,
        surname: newuser.firstName,
      },
      "968d8b95-72cd-4470-b13e-1017138d32cf",
      { expiresIn: '1h' }
    );

    if (newuser) {

      await send(
        "from",
        newuser.email,
        "New account",
        JSON.stringify({ user: newuser, token }),
        "html",
        "newUserAccount"
      );
    }
    res.send({ newuser });
  } catch (err) {
    console.log(err)
    res.status(400).send({ err });
  }
});

userRouter.put("/:id", async (req, res) => {
  let { id } = req.params;
  let updates = req.body;
  let { organization } = req.headers;
  if (!organization)
    res
      .status(404)
      .send({ errorMessage: "No organization found in the header" });
  else if (!id) res.status(404).send({ errorMessage: "No userId specified" });
  else {
    try {
      let updatedUser = await userModel.findByIdAndUpdate(id, updates, {
        new: true,
      });

      res.status(201).send({ updatedUser });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
});

userRouter.put("/recoverPassword/:email", async (req, res) => {
  let { email } = req.params;

  if (!email) res.status(404).send({ errorMessage: "No email specified" });
  else {
    try {
      // let newPassword = hashPassword(generatePassword(8));
      let updatedUser = await userModel.findOne({ email });

      let token = "";
      if (updatedUser) {
        token = jwt.sign(
          {
            email: updatedUser.email,
            surname: updatedUser.firstName,
          },
          "968d8b95-72cd-4470-b13e-1017138d32cf",
          { expiresIn: '1h' }
        );

      }

      if (updatedUser) {
        await send(
          "from",
          updatedUser?.email,
          "Password recovery Instructions",
          JSON.stringify({ user: updatedUser, token }),
          "html",
          "passwordRecover"
        );
        res.status(201).send({ updatedUser });
      } else {
        res
          .status(404)
          .send({ errorMessage: "The provided email does not exist!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
  }
});

userRouter.put("/resetPassword/:id", async (req, res) => {
  let { id } = req.params;
  let { token, newPassword } = req.body;
  if (!id) res.status(404).send({ errorMessage: "No userId specified" });
  else if (!token) res.status(404).send({ errorMessage: "No token provided" });
  else {
    try {
      let validToken = jwt.verify(token,SALT);
     
      if (validToken) {
        let _newPassword = hashPassword(newPassword);
        let updatedUser = await userModel.findByIdAndUpdate(
          id,
          { $set: { password: _newPassword } },
          {
            new: true,
          }
        );

        res.status(201).send({ updatedUser });
      } else {
        res.status(401).send({ errorMessage: "Invalid token" });
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
});

userRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let { organization } = req.headers;
  if (!organization)
    res
      .status(404)
      .send({ errorMessage: "No organization found in the header" });
  else if (!id) res.status(404).send({ errorMessage: "No userId specified" });
  else {
    try {
      let deletedUser = await userModel.findByIdAndDelete(id);

      res.status(201).send({ deletedUser });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
});

// User Authentication
userRouter.get("/login", async (req, res) => {
  try {
    let tenantId = req.query.tenantId;
    let { email, password } = req.query;

    let user = await userModel
      .findOne({ email: email });

    let valid = validPassword(password, user?.password);

    if (valid) {
      let otp = generateOTP();

      let userWithOtp = await userModel.findByIdAndUpdate(
        user?._id,
        { $set: { otp } },
        { new: true }
      );

      // await send('from',userWithOtp?.email,'Your DApproval OTP',JSON.stringify(userWithOtp),'html','otp')
      
      res.send(userWithOtp);
    } else
      res.status(401).send({ error: true, message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

userRouter.get("/otp/:id", async (req, res) => {
  let otp = generateOTP();
  let { id } = req.params;

  let user = await userModel.findByIdAndUpdate(
    id,
    { $set: { otp } },
    { new: true }
  );

  res.send({ user });
});

userRouter.get("/verify-otp", async (req, res) => {
  try {
    let { id, otp } = req.query;

    let user = await userModel
      .findById({ _id: id });

    let valid = user?.otp === otp;
    if (valid) {
      let newUser = await userModel.findByIdAndUpdate(
        id,
        { $set: { otp: "" } },
        { new: true }
      );
      res.send(newUser);
    } else res.send({ error: true, message: "Invalid OTP" });
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
});

userRouter.get("/login/google", passport.authenticate("google"));

userRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res, next) {
    // Successful authentication, redirect success.
    res.send("Welcome back!");
  }
);

userRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
});

export const generatePassword = (
  length = 20,
  wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
) =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join("");

export const hashPassword = (password: any) => {
  // Creating a unique salt for a particular user

  // Hashing user's salt and password with 1000 iterations,

  let hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, `sha512`)
    .toString(`hex`);

  return hash;
};

export const validPassword = (password: any, savedPassword: any) => {
  var hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, `sha512`)
    .toString(`hex`);
  return savedPassword === hash;
};

export function generateOTP() {
  return otp.generate(6, { digits: true, specialChars: false }).toUpperCase();
}

export default userRouter;
