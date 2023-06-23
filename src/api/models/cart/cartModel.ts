import mongoose from "mongoose";
import { Schema } from "mongoose";

// Import Interface
import CartInterface from "./interface";

const cartModel = new Schema<CartInterface>(
  {
    title: {
      type: String,
      required: [true, "Cart must have a title"],
    },
    price: {
      type: Number,
      required: [true, "Cart must have a price"],
    },
    quantity: {
      type: Number,
      // required: [true, "Cart must have a quantity"],
      default: 1,
    },
    address: {
      type: String,
      required: [true, "Cart must have a address"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dogCat",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Cart",
  }
);

// Middleware
cartModel.pre<CartInterface>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "email",
  }).populate({
    path: "pet",
    select: "name",
  });
  next();
});

const Cart = mongoose.model<CartInterface & mongoose.Document>(
  "Cart",
  cartModel
);

export default Cart;
