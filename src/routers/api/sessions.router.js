import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (password == 1234) {
      req.session.email = email;
      return res.cookie("email", email, { maxAge: 10000})
      .json({ statuCode: 200, session: req.session, message: "Loggeado" })
    } else {
      return res.json({ statuCode: 401, message: "error" })
    }
  } catch (error) {
    return next(error);
  }
});



export default sessionsRouter
