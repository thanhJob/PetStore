import express, { NextFunction, Request, Response } from "express";
import { logger } from "../../errorHandle/configLogger";
import Cart from "../models/cart/cartModel";
import Pet from "../models/product/productModel";
import Product from "../models/product/productModel";

export async function getCarts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const carts = await Cart.find();
  if (!carts) logger.info("Can't get data. Try again!");

  res.status(200).json({
    status: "Successfully!",
    length: carts.length,
    data: carts,
  });
}

export async function createCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const pet = await Product.findById(req.params.idPet);
  if (!req.body.title) req.body.title = pet!.name;
  // console.log(pet);
  if (!req.body.price) req.body.price = pet!.price;
  if (!req.body.pet) req.body.pet = pet!._id;
  if (!req.body.user) req.body.user = Object.values(req.user!)[5]._id;
  const newCart = await Cart.create(req.body);
  if (!newCart) logger.info("Can't create data. Try again!");

  res.status(201).json({
    status: "Successfully!",
    data: newCart,
  });
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) logger.info("Can't find data. Try again!");
    res.status(200).json({
      status: "Successfully!",
      data: cart,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cart) logger.info("Can't update data. Try again!");
    res.status(203).json({
      status: "Successfully!",
      data: cart,
    });
  } catch (err) {
    console.log(err);
  }
}
