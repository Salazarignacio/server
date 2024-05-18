import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UsersManager from "../data/mongo/UsersManager.js";
import { createHash, verifyHash } from "../../utils/hash.util.js";

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
    async(req, email, password, done)=>{
        try {
            /* isValidData */
            const {email, password}= req.body
            if(!email){
                const error = new Error('Enter an email')
                error.statusCode = 400
                return done(error)
            }
            if(!password){
                const error = new Error('Enter a password')
                error.statusCode = 400
                return done(error)
            }
            /* isValidEmail */
            const one =await UsersManager.readByEmail(email);
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
            return done(error)
        }
    }
  )
);

export default passport