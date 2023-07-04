import { Request, Response, NextFunction } from "express";

import Comment from "../../../models/comment/cmtModel";
import { logger } from "../../../../errorHandle/configLogger";
import { createNewComment, getAll, getId, updateId } from "../service/service";

export async function getComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const comments = await getAll();

    res.status(200).json({
      status: "Successful!",
      data: comments,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newComment = await createNewComment(req);

    res.status(201).json({
      status: "Successful!",
      data: newComment,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const comment = await getId(id);
    res.status(200).json({
      status: "Successful!",
      data: comment,
    });
  } catch (err) {
    console.log(err);
  }
}
