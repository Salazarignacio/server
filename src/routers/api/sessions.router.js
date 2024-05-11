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

sessionsRouter.get("/login",isValidUser, isValidPass, async (req, res, next) => {
  try {
    const { email } = req.body;
    const readEmail = UsersManager.readByEmail(email);
    req.session.email = email;
    req.session.role = readEmail.role;
    return res.json({
      statusCode: 200,
      message: 'Logged'
    })
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
