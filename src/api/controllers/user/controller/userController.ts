import express, { Request, Response, NextFunction, query } from "express";

// Import User Model
import User from "../../../models/user/userModel";
import { logger } from "../../../../errorHandle/configLogger";
import {
  activeUser,
  deleteId,
  deleteProfile,
  getAll,
  getId,
  updateId,
} from "../service/service";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAll();

    res.status(200).json({
      status: "Successfully!",
      length: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const user = await getId(id);
    res.status(200).json({
      status: "Successfully!",
      dataL: user,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const user = await updateId(id, req.body);
    res.status(203).json({
      status: "Successfully!",
      dataL: user,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const user = await deleteId(id);
    res.status(204).json({
      status: "Successfully!",
      dataL: null,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function removeActive(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await activeUser(req);
    res.status(204).json({
      status: "Successfully!",
      dataL: null,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateProfileMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentUser = await deleteProfile(req);

    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err) {
    console.log(err);
  }
}
