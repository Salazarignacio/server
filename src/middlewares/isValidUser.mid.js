import UsersManager from "../data/mongo/UsersManager.js";

async function isValidUser(req, res, next) {
  try {
    const { email } = req.body;
    console.log(email);
    const one = await UsersManager.readByEmail(email);
    if (one) {
      return next();
    } else {
      const error = new Error("Bad auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export default isValidUser;
