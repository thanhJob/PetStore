import express from "express";
import { createPost, getPost } from "../controllers/postController";
import { permissionsAccout, security } from "../controllers/authController";

const router = express.Router();

router
  .route("/")
  .get(security, permissionsAccout("admin", "user"), getPost)
  .post(security, permissionsAccout("admin", "user"), createPost);

export default router;
