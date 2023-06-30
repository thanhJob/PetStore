import { NextFunction, Request, Response } from "express";
import User from "../../../models/user/userModel";

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

export async function activeUser(req: Request) {
  const user = await User.findByIdAndUpdate(
    Object.values(req.user!)[5]._id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) throw new Error("Can't update data user. Try again later!");
  return user;
}

export async function deleteProfile(req: Request) {
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

  if (req.body.password)
    throw new Error(
      "This router is not for passwords update. Pls use /updateMyPassword!"
    );
  if (req.body.role) throw new Error("You does not permission update role!");
  const filterKeys = filterObj(req.body, "name", "address", "phone");
  const currentUser = await User.findByIdAndUpdate(req.body!._id, filterKeys, {
    new: true,
    runValidators: true,
  });

  if (!currentUser) throw new Error("Can't update user. Try again later!");
  return currentUser;
}
