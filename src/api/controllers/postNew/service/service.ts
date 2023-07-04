import { NextFunction, Request, Response } from "express";
import Post from "../../../models/postNew/postModel";

export async function getAll() {
  const posts = await Post.find();
  if (!posts) throw new Error("Can't get data posts. Try again later!");
  return posts;
}

export async function getId(id: string) {
  const post = await Post.findById(id).populate({
    path: "comment",
    select: "description",
    model: Comment,
  });
  if (!post) throw new Error("Can't get data post. Try again later!");
  return post;
}

export async function createNewPost(req: Request) {
  if (!req.body.author) req.body.author = Object.values(req.user!)[5]._id;
  const newPost = await Post.create(req.body);
  if (!newPost) throw new Error("Can't create new data. Try again later!");
  return newPost;
}

export async function updateId(id: string, body: any) {
  const post = await Post.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!post) throw new Error("Can't update post. Try again later!");
  return post;
}

export async function deleteId(id: string) {
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error("Can't delete post. Try again later!");
  return post;
}
