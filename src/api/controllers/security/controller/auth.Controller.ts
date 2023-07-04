import express, { Request, Response, NextFunction, query } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto, { createHash } from "crypto";

// Import User Model
import User from "../../../models/user/userModel";
import { sendEmail } from "../../../../ultis/configEmail";
import { logger } from "../../../../errorHandle/configLogger";
import {
  createUser,
  forgotPassUser,
  logInUser,
  resetPassUser,
  securityUser,
  updatePassCurrentUser,
} from "../service/service";

// Config function create token
const privateKey: string = process.env.PRIVATE_KEY_TOKEN ?? "";

const signToken = (model: any) => {
  return jwt.sign({ model }, privateKey, {
    expiresIn: process.env.EXPIRES_TOKEN,
  });
};

// conrrect password function
const comparePass = (passWord: any, userPass: any) => {
  return bcrypt.compare(passWord, userPass);
};

// config function resetToken
const resetToken = (model: any) => {
  const token = crypto.randomBytes(32).toString("hex");
  model.passwordResetToken = createHash("sha256").update(token).digest("hex");
  model.passwordResetExpires = new Date(Date.now() * 10 * 60 * 1000);

  return token;
};

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await createUser(req.body);
    const token = signToken(newUser.id);
    res.status(201).json({
      status: "Successfully!",
      token,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function logIn(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await logInUser(req);
    const token = signToken(user.id);
    res.status(201).json({
      status: "Successfully",
      token,
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function security(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUser = await securityUser(req);
    // grant permission
    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
  }
}

export function permissionsAccout(...roles: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(Object.values(req.user!)[5].role)) {
      throw new Error("You do not have permission to perform this action!");
    }
    next();
  };
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await forgotPassUser(req, res);
    res.status(201).json({
      status: "Successfully!",
    });
  } catch (err) {
    const currentUser = await User.findOne({ email: req.body.email });
    currentUser!.passwordResetToken = undefined;
    currentUser!.passwordResetExpires = undefined;
    currentUser!.save({ validateBeforeSave: false });
    console.log(err);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUser = await resetPassUser(req, res);
    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateCurrentPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUser = await updatePassCurrentUser(req);

    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err) {
    console.log(err);
  }
}
