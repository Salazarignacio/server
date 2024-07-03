import { verifyToken } from "../../utils/token.utils.js";
import errors from "../../utils/errors.utils.js";
import CustomError from "../../utils/CustomError.utils.js";

function isAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    const data = verifyToken(token);
    
    if (data) {
      req.user = data;
      return next();
    } else {
      const error = new CustomError(errors.forbidden);
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isAuth;
