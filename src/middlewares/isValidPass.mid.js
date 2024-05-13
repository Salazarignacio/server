import UsersManager from "../data/mongo/UsersManager.js";

async function isValidPass(req, res, next) {
  try {
    const { password, email } = req.body;
    const one = await UsersManager.readByEmail(email);

    const mongoPassword = one.password;
    if (mongoPassword == password) {
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
