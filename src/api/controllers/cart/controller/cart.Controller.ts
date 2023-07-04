import express, { NextFunction, Request, Response } from "express";
import { logger } from "../../../../errorHandle/configLogger";
import Cart from "../../../models/cart/cartModel";
import Pet from "../../../models/product/productModel";
import Product from "../../../models/product/productModel";
import { createNewCart, getAll, getId, updateId } from "../service/service";

export async function getCarts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const carts = await getAll();
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
  const newCart = await createNewCart(req);
  res.status(201).json({
    status: "Successfully!",
    data: newCart,
  });
}

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const cart = await getId(id);
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
    const id = req.params.id;
    const cart = await updateId(id, req.body);
    res.status(203).json({
      status: "Successfully!",
      data: cart,
    });
  } catch (err) {
    console.log(err);
  }
}
