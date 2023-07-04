import { NextFunction, Request, Response } from "express";
import Comment from "../../../models/comment/cmtModel";
import { logger } from "../../../../errorHandle/configLogger";

export async function getAll() {
  const comments = await Comment.find();
  if (!comments) throw new Error("Can't get data comments. Try again later!");
  return comments;
}

export async function getId(id: string) {
  const post = await Comment.findById(id).populate({
    path: "comment",
    select: "description",
    model: Comment,
  });
  if (!post) throw new Error("Can't get data post. Try again later!");
  return post;
}

export async function createNewComment(req: Request) {
  if (!req.body.post) req.body.post = req.params.idPost;
  if (!req.body.author) req.body.author = Object.values(req.user!)[5]._id;
  const newComment = await Comment.create(req.body);
  if (!newComment) throw new Error("Can't create comment. Try again later!");
  return newComment;
}

export async function updateId(id: string, body: any) {
  const comment = await Comment.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!comment) throw new Error("Can't update comment. Try again later!");
  return comment;
}

export async function deleteId(id: string) {
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) throw new Error("Can't delete comment. Try again later!");
  return comment;
}
