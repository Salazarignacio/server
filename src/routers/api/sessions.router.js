import CustomRouter from "./CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      /*   passport.authenticate("register", { session: false }), */
      passportCb("register"),
      async (req, res, next) => {
        try {
          return res.response201("registered");
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/",
      /* passport.authenticate("session-check", { session: false }), */
      passportCb("sesseion-check"),
      async (req, res, next) => {
        try {
          return res.response200();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create(
      "/login",
      /* passport.authenticate("login", { session: false }), */
      passportCb("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.user.token, { signedCookie: true })
            .response200("Logged In");
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/online", passportCb("jwt"), async (req, res, next) => {
      try {
        if (req.user.online) {
          return res.json({
            statusCode: 200,
            message: "is Online",
            user_id: req.user._id,
            email: req.user.email,
          });
        } else {
          return res.error400('Bad bad')
        }
      } catch (error) {
        return next(error);
      }
    });

    this.read("/signOut", async (req, res, next) => {
      try {
        req.session.destroy();
        return res
          .clearCookie("token")
          .json({ statusCode: 200, message: "Signed out!", online: false });
      } catch (error) {
        return next(error);
      }
    });

    this.read(
      "/google",
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
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
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
