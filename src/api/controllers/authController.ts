import express, { Request, Response, NextFunction, query } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto, { createHash } from "crypto";

// Import User Model
import User from "../models/user/userModel";
import { sendEmail } from "../../ultis/configEmail";
import { logger } from "../../errorHandle/configLogger";

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
    const newUser = await User.create(req.body);
    if (!newUser) throw new Error("Can't create new user. Try again!");

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
    // check user exits
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User does not exits! Try again later.");

    // check pass
    const conrrectPass = await comparePass(req.body.password, user.password);
    if (!conrrectPass)
      throw new Error("Conrrecr password to false! Try again.");

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
    // get token
    let token;
    if (
      req.headers.authorization ||
      req.headers.authorization?.startsWith("Bearer")
    ) {
      token = req.headers.authorization?.split(" ")[1];
    }
    // check token
    if (!token) throw new Error("You does not login. Try again!");

    // check expired token
    const expiresToken = jwt.verify(token, privateKey);
    if (!expiresToken) throw new Error("Verify expired token");
    // console.log(Object.values(expiresToken)[0]);
    // check user
    const currentUser = await User.findOne({
      _id: Object.values(expiresToken)[0],
    });
    if (!currentUser) throw new Error("User does not exits. Try again!");

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
    // check user exits
    const currentUser = await User.findOne({ email: req.body.email });
    // console.log(currentUser);
    if (!currentUser)
      throw new Error("User does not exits with email. Try again!");

    // create token reset password
    const tokenValue = resetToken(currentUser);
    // save value user
    currentUser.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${tokenValue}`;
    const message = `Forgot your password! Submit a patch request with your new password in here: \n
        ${resetURL}`;

    await sendEmail({
      email: currentUser.email,
      subject: "Send to mail reset token password! (Invalid for 10 minute)",
      message: message,
    });
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
    // create token with token in params
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    // console.log(hashedToken);
    // check user
    const currentUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $ne: Date.now() },
    });
    if (!currentUser)
      throw new Error("User does not exits with token. Pls try again later!");

    currentUser.password = req.body.newPassword;
    currentUser.save();
    currentUser.passwordResetToken = undefined;
    currentUser.passwordResetExpires = undefined;

    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });

    // console.log(currentUser);
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
    const currentUser = await User.findById(Object.values(req.user!)[5]._id);
    // console.log(currentUser);
    if (!currentUser) throw new Error("User does not exits. Try again!");

    // check compare pass
    const conrrectPass = await comparePass(
      req.body.currentPass,
      Object.values(req.user!)[5].password
    );
    if (!conrrectPass) throw new Error("Compare password it false. Try again!");

    currentUser.password = req.body.newPass;
    currentUser.save();

    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err) {
    console.log(err);
  }
}
