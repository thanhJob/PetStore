import express from "express";
import { permissionsAccout, security } from "../controllers/authController";
import {
  createPet,
  deletePet,
  getPet,
  getPets,
  sortProduct,
  updatePet,
} from "../controllers/petController";
// Import Controller

const router = express.Router();

router
  .route("/sortPrice")
  .get(security, permissionsAccout("admin"), sortProduct, getPets);

router
  .route("/")
  .get(security, permissionsAccout("admin"), getPets)
  .post(security, permissionsAccout("admin"), createPet);

router
  .route("/:id")
  .get(security, permissionsAccout("admin"), getPet)
  .patch(security, permissionsAccout("admin"), updatePet)
  .delete(security, permissionsAccout("admin"), deletePet);

export default router;
