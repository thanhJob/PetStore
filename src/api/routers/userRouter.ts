import express from "express";
import {
  forgotPassword,
  logIn,
  permissionsAccout,
  resetPassword,
  security,
  signUp,
  updateCurrentPassword,
  // updateCurrentPassword,
} from "../controllers/authController";
import {
  deleteUser,
  getUser,
  getUsers,
  removeActive,
  updateProfileMe,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

// AUTHENTIC
router.route("/SignUp").post(signUp);
router.route("/logIn").post(logIn);
router
  .route("/forgotPassword")
  .post(security, permissionsAccout("admin", "user"), forgotPassword);
router
  .route("/resetPassword/:token")
  .patch(security, permissionsAccout("admin", "user"), resetPassword);
router
  .route("/updateCurrentPassword")
  .patch(security, permissionsAccout("admin", "user"), updateCurrentPassword);

router
  .route("/removeActive")
  .patch(security, permissionsAccout("admin", "user"), removeActive);

router
  .route("/updateProfileMe")
  .patch(security, permissionsAccout("admin", "user"), updateProfileMe);

// USER
router.route("/").get(security, permissionsAccout("admin", "user"), getUsers);

// PARAMS ID
router
  .route("/:id")
  .get(security, permissionsAccout("admin"), getUser)
  .patch(security, permissionsAccout("admin"), updateUser)
  .delete(security, permissionsAccout("admin"), deleteUser);

export default router;
