import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UsersManager from "../data/mongo/UsersManager.js";
import { createHash, verifyHash } from "../../utils/hash.util.js";

import { Strategy as CustomStrategy } from "passport-custom";


passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        /* isValidData */
        const { email, password } = req.body;
        if (!email) {
          const error = new Error("Enter an email");
          error.statusCode = 400;
          return done(error);
        }
        if (!password) {
          const error = new Error("Enter a password");
          error.statusCode = 400;
          return done(error);
        }
        /* isValidEmail */
        const one = await UsersManager.readByEmail(email);
        if (one) {
          const error = new Error("error!");
          error.statusCode = 400;
          return done(error);
        }
        /* createHasPassword */
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await UsersManager.create(req.body);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await UsersManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth from login");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          req.session.email = email;
          req.session.online = true;
          req.session.role = one.role;
          req.session.photo = one.photo;
          req.session.user_id = one._id;
          return done(null, one);
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "session-check",
  new CustomStrategy((req, done) => {
    if (req.session.online) {
      return done(null, req.session);
    } else {
      const error = new Error("Unauthorized: You need to log in");
      error.statusCode = 401;
      return done(error);
    }
  })
);

export default passport;
