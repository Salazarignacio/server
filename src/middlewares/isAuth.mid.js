import { verifyToken } from "../../utils/token.utils.js";

function isAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    const data = verifyToken(token);
    
    if (data) {
      req.user = data;
      return next();
    } else {
      const error = new Error("Forbbidense");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isAuth;
