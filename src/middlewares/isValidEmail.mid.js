import UsersManager from "../data/mongo/UsersManager.js";

async function isValidEmail(req, res, next) {
  try {
    const { email } = req.params;
    const one = UsersManager.readByEmail(email);
    if (one) {
      const error = new Error("error!");
      error.statusCode = 400;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidEmail;
