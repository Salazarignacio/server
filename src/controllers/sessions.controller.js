import {
  readByEmailService,
  updateService,
} from "../services/users.services.js";

class SessionsController {
  async register(req, res, next) {
    try {
      return res.response201("registered");
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { httpOnly: true, signedCookie: true })
        .response200("Logged In");
    } catch (error) {
      return next(error);
    }
  }

  async online(req, res, next) {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "is Online",
          user_id: req.user._id,
          email: req.user.email,
        });
      } else {
        return res.error400("Bad bad");
      }
    } catch (error) {
      return next(error);
    }
  }

  async verifyCode(req, res, next) {
    try {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      const verify = code == one.verifyCode;
      console.log(verify);
      if (verify) {
       const update =  updateService(one._id, { verify });
        res.response200({  message: update });
      } else {
        return res.error400("Invalid Crecre");
      }
    } catch (error) {
      return next(error);
    }
  }

  async signOut(req, res, next) {
    try {
      req.session.destroy();
      return res
        .clearCookie("token")
        .json({ statusCode: 200, message: "Signed out!", online: false });
    } catch (error) {
      return next(error);
    }
  }

  async google(req, res, next) {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged with google",
      });
    } catch (error) {
      return next(error);
    }
  }
}
const sessionsController = new SessionsController();
const { register, login, online, signOut, google, verifyCode } =
  sessionsController;
export { register, login, online, signOut, google, verifyCode };
