import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config({ path: ".env" });

import app from "./app";

// Connect Data
const URLData = process.env.DATA;
// console.log(URLData);
if (!URLData) {
  console.log("Url Data does not exits!");
} else {
  mongoose
    .connect(URLData, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((doc) => {
      //   console.log(doc);
      console.log("Connect data mongoDB successful!");
    })
    .catch((err) => {
      console.log(err);
    });
}

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`App listen running at port: ${port}`);
  console.log(process.env.DEV);
});
