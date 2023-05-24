import express from "express";
import {
  createCart,
  getCart,
  // createCartParamPet,
  getCarts,
  updateCart,
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
  .route("/:id")
  .get(security, permissionsAccout("admin"), getCart)
  .patch(security, permissionsAccout("admin"), updateCart);

router
  .route("/")
  .get(security, permissionsAccout("admin"), getCarts)
  .post(security, permissionsAccout("admin"), createCart);

export default router;
