import { Schema } from "mongoose";
import mongoose from "mongoose";

// Import interface
import product from "./interface";

const productSchema = new Schema<product>(
  {
    name: {
      type: String,
      require: [true, "A product must have a name!"],
    },
    price: {
      type: Number,
      require: [true, "A product must have a price"],
    },
    description: {
      type: String,
      maxLength: [
        1000,
        "A product must have less of equal then 1000 characters",
      ],
      minLength: [10, "A product must have less of less then 10 characters"],
    },
    images: [String],
    weigth: {
      type: String,
      require: [true, "A product must have a weigth"],
    },
    heigth: {
      type: String,
      require: [true, "A product must have a heigth"],
    },
    size: {
      type: String,
      require: [true, "A product must have a size"],
    },
    origin: {
      type: String,
      require: [true, "A product must have a origin"],
    },
    age: {
      type: String,
      require: [true, "A product must have a age"],
    },
    birth: {
      type: String,
      require: [true, "A product must have a birth"],
    },
    ratings: {
      type: Number,
      max: 5,
      min: 1,
      default: 4.5,
    },
    class: {
      type: String,
      require: [true, "A product must have a class"],
    },
    quantity: {
      type: Number,
      require: [true, "A product must have a quantity"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "dogCat",
  }
);

const Product = mongoose.model<product & mongoose.Document>(
  "dogCat",
  productSchema
);

export default Product;
