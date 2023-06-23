import express from "express";
import { paypalFunction } from "../controllers/paypalControlle";

const router = express.Router();

router.get("/payment", paypalFunction);

export default router;
