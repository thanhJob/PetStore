import { NextFunction, Request, Response } from "express";
import Product from "../../../models/product/productModel";

export async function getAll(req: Request) {
  // filter
  const newObj = { ...req.query };
  const removeFileds = ["sort", "limit", "page", "fields"];
  removeFileds.forEach((el) => {
    delete newObj[el];
  });

  // filter acvanced
  let queryStr = JSON.stringify(newObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Product.find(JSON.parse(queryStr));

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

  if (!query) throw new Error("Can't find. Try again!");
  return query;
}

export async function getId(id: string) {
  const product = await Product.findById(id);
  if (!product) throw new Error("Can't get data product. Try again later!");
  return product;
}

export async function createProduct(body: any) {
  const product = await Product.create(body);
  if (!product) throw new Error("Can't create data product. Try again later!");
  return product;
}

export async function updateId(id: string, body: any) {
  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new Error("Can't update product. Try again later!");
  return product;
}

export async function deleteId(id: string) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Can't delete product. Try again later!");
  return product;
}
