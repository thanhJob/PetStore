import express, { Request, Response, NextFunction, query } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto, { createHash } from "crypto";

// Import User Model
import User from "../../../models/user/userModel";
import userInterface from "../interface";
import { sendEmail } from "../../../../ultis/configEmail";
import { logger } from "../../../../errorHandle/configLogger";

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

export async function getAll() {
  const users = await User.find();
  if (!users) throw new Error("Can't get data user. Try again later!");
  return users;
}

export async function getId(id: string) {
  const user = await User.findById(id).populate("cart");
  if (!user) throw new Error("Can't get data user. Try again later!");
  return user;
}

export async function create(body: any) {
  const user = await User.create(body);
  if (!user) throw new Error("Can't create data user. Try again later!");
  return user;
}

export async function updateId(id: string, body: any) {
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new Error("Can't update user. Try again later!");
  return user;
}

export async function deleteId(id: string) {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("Can't delete user. Try again later!");
  return user;
}

export async function logInUser(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new Error("User does not exits! Try again later.");
  // check pass
  const conrrectPass = await comparePass(req.body.password, user.password);
  if (!conrrectPass) throw new Error("Conrrecr password to false! Try again.");

  return user;
}
