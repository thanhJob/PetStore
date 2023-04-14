import express, { Request, Response, NextFunction, query } from "express";

// Import User Model
import User from "../models/user/userModel";
import e from "express";
import { logger } from "../../errorHandle/configLogger";

// Update fields
const filterObj = (obj: any, ...allWebFields: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((el) => {
    if (allWebFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find();
    if (!users)
      throw new Error("Can't get data or data does not exits. Try again!");

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
    const user = await User.findById(req.params.id);
    if (!user) logger.info("Can't get data user. Try again later!");
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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new Error("Can't update data user. Try again later!");
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
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("Can't delet data user. Try again later!");
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
    const user = await User.findByIdAndUpdate(
      Object.values(req.user!)[5]._id,
      { active: false },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) throw new Error("Can't update data user. Try again later!");
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
    if (req.body.password)
      throw new Error(
        "This router is not for passwords update. Pls use /updateMyPassword!"
      );
    if (req.body.role) throw new Error("You does not permission update role!");
    const filterKeys = filterObj(req.body, "name", "address", "phone");
    const currentUser = await User.findByIdAndUpdate(
      req.body!._id,
      filterKeys,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!currentUser) throw new Error("Can't update user. Try again later!");

    res.status(203).json({
      status: "Successfully!",
      data: currentUser,
    });
  } catch (err) {
    console.log(err);
  }
}
