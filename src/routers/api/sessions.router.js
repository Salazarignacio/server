import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
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
  passport.authenticate("session-check", { session: false }),
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
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 200, message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "is Online",
        user_id: req.session.user_id,
        email: req.session.email,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: "Sign In",
      });
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/signOut", async (req, res, next) => {
  try {
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!", online: false });
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
        message: "Logged whith google",
      });
    } catch (error) {
      return next(error);
    }
  }
);
export default sessionsRouter;
