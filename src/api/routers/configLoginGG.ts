import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import passportGG from "passport-google-oauth20";
import keys from "../../ultis/keys";
import User from "../models/user/userModel";

const app = express();
const router = express.Router();

const GoogleStrategy = passportGG.Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile"],
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      if (profile) {
        User.findOne({ googleID: profile.id }).then((exitstingUser: any) => {
          if (exitstingUser) {
            cb(null, exitstingUser);
          } else {
            new User({
              googleId: profile.id,
              email: Object.values(profile.emails!)[0].value,
              name:
                Object.values(profile.name!)[0] +
                " " +
                Object.values(profile.name!)[1],
            })
              .save()
              .then((user) => cb(null, user));
          }
        });
        // console.log(profile);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  User.findById(id).then((user: any) => {
    done(null, user);
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    res.redirect("/api/current_user");
  }
);

router.get("/api/current_user", (req: Request, res: Response) => {
  res.send(req.user);
});

export default router;
