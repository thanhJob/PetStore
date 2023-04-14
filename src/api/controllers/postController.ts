import { Request, Response, NextFunction } from "express";

// Import post model

import Post from "../models/postNew/postModel";
import User from "../models/user/userModel";
import { logger } from "../../errorHandle/configLogger";

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await Post.find();
    if (!posts) logger.info("Can't get data. Try again!");

    res.status(200).json({
      status: "Successfully!",
      length: posts.length,
      data: posts,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newPost = await Post.create(req.body);
    if (!newPost) logger.info("Can't create new data. Try again later!");

    res.status(201).json({
      status: "Successfully!",
      data: newPost,
    });
  } catch (err) {
    console.log(err);
  }
}
