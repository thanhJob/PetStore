import express, { Request, Response, NextFunction, query } from "express";
// Import Service
import {
  createProduct,
  deleteId,
  getAll,
  getId,
  updateId,
} from "../service/service";
// Import Model
import Pet from "../../../models/product/productModel";

export function sortProduct(req: Request, res: Response, next: NextFunction) {
  req.query.sort = "-price";
  next();
}

export async function getPets(req: Request, res: Response, next: NextFunction) {
  try {
    const pets = await getAll(req);
    if (!pets) throw new Error("Can't find. Try again!");

    res.status(200).json({
      status: "Successfully!",
      length: pets.length,
      data: pets,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createPet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newPet = await createProduct(req.body);
    res.status(201).json({
      status: "Successfully!",
      data: newPet,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getPet(req: Request, res: Response, next: NextFunction) {
  try {
    const currentID = req.params.id;
    const pet = await getId(currentID);
    res.status(200).json({
      status: "Successfully!",
      dataL: pet,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updatePet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentId = req.params.id;
    const pet = await updateId(currentId, req.body);
    res.status(203).json({
      status: "Successfully!",
      dataL: pet,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deletePet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currentId = req.params.id;
    await deleteId(currentId);
    res.status(204).json({
      status: "Successfully!",
      dataL: null,
    });
  } catch (err) {
    console.log(err);
  }
}
