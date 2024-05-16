import { Router } from "express";
import UsersManager from "../../data/mongo/UsersManager.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  isValidData,
  isValidEmail,
  async (req, res, next) => {
    try {
      const data = req.body;
      await UsersManager.create(data);
      return res.json({
        statusCode: 201,
        message: "Registered",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  isValidUser,
  isValidPass,
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const one = await UsersManager.readByEmail(email);
      req.session.email = email;
      req.session.online = true;
      req.session._id = one._id;
      // role
      return res.json({
        statusCode: 200,
        message: "Logged",
        online: true,
        email: email,
      });
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
        user_id: req.session._id,
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
export default sessionsRouter;
