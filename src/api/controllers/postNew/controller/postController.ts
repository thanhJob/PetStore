import { Request, Response, NextFunction } from "express";

// Import post model

import Post from "../../../models/postNew/postModel";
import User from "../../../models/user/userModel";
import { logger } from "../../../../errorHandle/configLogger";
import Comment from "../../../models/comment/cmtModel";
import {
  createNewPost,
  deleteId,
  getAll,
  getId,
  updateId,
} from "../service/service";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await getAll();
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
    const newPost = await createNewPost(req);

    res.status(201).json({
      status: "Successfully!",
      data: newPost,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const post = await getId(id);

    res.status(200).json({
      status: "Successfully!",
      data: post,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const post = await updateId(id, req.body);
    res.status(203).json({
      status: "Successfully!",
      data: post,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const post = await deleteId(id);

    res.status(204).json({
      status: "Successfully!",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
}
