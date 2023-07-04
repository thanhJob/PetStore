import express, { NextFunction, Request, Response } from "express";
import passportGg from "../controllers/loginGG/loginGg.Controller";
const router = express.Router();

router.get(
  "/auth/google",
  passportGg.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passportGg.authenticate("google"),
  (req: Request, res: Response) => {
    res.redirect("/home");
  }
);

router.get("/home", (req: Request, res: Response) => {
  res.send("hello");
  // console.log(req.user);
});

export default router;
