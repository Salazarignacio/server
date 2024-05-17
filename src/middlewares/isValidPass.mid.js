import UsersManager from "../data/mongo/UsersManager.js";
import { verifyHash } from "../../utils/hash.util.js";

async function isValidPass(req, res, next) {
  try {
    const { password, email } = req.body;
    const one = await UsersManager.readByEmail(email);
    const verify = verifyHash(password, one.password)
    
    if (verify) {
      return next();
    } else {
      const error = new Error(" Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isValidPass;
