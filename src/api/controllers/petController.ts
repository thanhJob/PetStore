import express, { Request, Response, NextFunction, query } from "express";

// Import Model
import Pet from "../models/product/productModel";

export function sortProduct(req: Request, res: Response, next: NextFunction) {
  req.query.sort = "-price";
  next();
}

export async function getPets(req: Request, res: Response, next: NextFunction) {
  try {
    // filter
    const newObj = { ...req.query };
    const removeFileds = ["sort", "limit", "page", "fields"];
    removeFileds.forEach((el) => {
      delete newObj[el];
    });

    // filter acvanced
    let queryStr = JSON.stringify(newObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Pet.find(JSON.parse(queryStr));

    // filetr sort
    if (req.query.sort) {
      const sortBy = `${req.query.sort}`.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-price");
    }

    // filetr fields
    if (req.query.fields) {
      const fieldsBy = `${req.query.fields}`.split(",").join(" ");
      query = query.select(fieldsBy);
    } else {
      query = query.select("-__v");
    }

    // filter pagination
    if (req.query.page) {
      const page = parseInt(`${req.query.page}`) * 1 || 1;
      const limit = parseInt(`${req.query.limit}`) * 1 || 10;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }
    const pets = await query;
    if (!pets) throw new Error("can't found data! Try again later.");

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
    const newPet = await Pet.create(req.body);
    if (!newPet) throw new Error("Can't create new Pet!");
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
    const pet = await Pet.findById(req.params.id);
    if (!pet) throw new Error("Can't get data product. Try again later!");
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
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) throw new Error("Can't update data product. Try again later!");
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
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) throw new Error("Can't delet data product. Try again later!");
    res.status(204).json({
      status: "Successfully!",
      dataL: null,
    });
  } catch (err) {
    console.log(err);
  }
}
