import express from "express";
import {
  createCart,
  // createCartParamPet,
  getCarts,
} from "../controllers/cartController";
import { permissionsAccout, security } from "../controllers/authController";
const router = express.Router({ mergeParams: true });

// router.post(
//   "/:idPet/createCart",
//   security,
//   permissionsAccout("admin", "user"),
//   createCartParamPet
// );

router
  .route("/")
  .get(security, permissionsAccout("admin"), getCarts)
  .post(security, permissionsAccout("admin"), createCart);

export default router;
