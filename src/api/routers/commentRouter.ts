import express from "express";
import {
  createComment,
  getComment,
  getComments,
} from "../controllers/commentController";
import { permissionsAccout, security } from "../controllers/authController";

const router = express.Router({ mergeParams: true });

router.route("/:id").get(security, permissionsAccout("admin"), getComment);

router
  .route("/")
  .get(security, permissionsAccout("admin"), getComments)
  .post(security, permissionsAccout("admin", "user"), createComment);

export default router;
