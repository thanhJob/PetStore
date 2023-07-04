import { NextFunction, Request, Response } from "express";
import Cart from "../../../models/cart/cartModel";
import Product from "../../../models/product/productModel";

export async function getAll() {
  const carts = await Cart.find();
  if (!carts) throw new Error("Can't get data carts. Try again later!");
  return carts;
}

export async function getId(id: string) {
  const cart = await Cart.findById(id).populate("cart");
  if (!cart) throw new Error("Can't get data cart. Try again later!");
  return cart;
}

export async function createNewCart(req: Request) {
  const pet = await Product.findById(req.params.idPet);
  if (!req.body.title) req.body.title = pet!.name;
  if (!req.body.price) req.body.price = pet!.price;
  if (!req.body.pet) req.body.pet = pet!._id;
  if (!req.body.user) req.body.user = Object.values(req.user!)[5]._id;
  const newCart = await Cart.create(req.body);
  if (!newCart) throw new Error("Can't create data. Try again!");
  return newCart;
}

export async function updateId(id: string, body: any) {
  const cart = await Cart.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!cart) throw new Error("Can't update cart. Try again later!");
  return cart;
}

export async function deleteId(id: string) {
  const cart = await Cart.findByIdAndDelete(id);
  if (!cart) throw new Error("Can't delete cart. Try again later!");
  return cart;
}
