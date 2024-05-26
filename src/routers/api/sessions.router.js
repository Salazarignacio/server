import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  /*   passport.authenticate("register", { session: false }), */
  passportCb("register"),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/",
  /* passport.authenticate("session-check", { session: false }), */
  passportCb("sesseion-check"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        email: req.session.email,
        online: req.session.online,
        role: req.session.role,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  /* passport.authenticate("login", { session: false }), */
  passportCb("login"),
  async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in!",
        token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get(
  "/online",
  /* passport.authenticate("jwt", { session: false }), 
 /*  isAuth, */
  passportCb("jwt"),
  async (req, res, next) => {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "is Online",
          user_id: req.user._id,
          email: req.user.email,
        });
      } else {
        return res.json({
          statusCode: 403,
          message: "Bad bad",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/signOut", async (req, res, next) => {
  try {
    req.session.destroy();
    return res
      .clearCookie("token")
      .json({ statusCode: 200, message: "Signed out!", online: false });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged with google",
      });
    } catch (error) {
      return next(error);
    }
  }
);
export default sessionsRouter;
