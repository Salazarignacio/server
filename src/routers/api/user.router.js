import CustomRouter from "./CustomRouter.js";
import UsersManager from "../../data/mongo/UsersManager.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", passportCb("jwt"), readOne);
    this.create("/", create);
    this.update("/:uid", update);
    this.destroy("/:uid", destroy);
    this.read("/email/:email", readByEmail);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await UsersManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID " + create.id,
    });
  } catch (error) {
    next(error);
  }
}
async function read(req, res, next) {
  try {
    const read = await UsersManager.readOne("66475c982437f88f1434d822");
    if (read.length > 0) {
      return res.json({
        statusCode: 200,
        /* message: read, */
        req: req.session,
      });
    } else {
      const error = new Error("FILE NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const readOne = await UsersManager.readOne(req.user._id);
    if (readOne) {
      return res.json({
        statusCode: 200,
        message: readOne,
      });
    } else {
      const error = new Error("ID NOT FOUND IN FILE");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function readByEmail(req, res, next) {
  try {
    const { email } = req.params;
    const readMail = await UsersManager.readByEmail(email);
    if (readMail) {
      res.json({
        statusCode: 200,
        message: readMail,
      });
    } else {
      const error = new Error("EMAIL NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const destroy = await UsersManager.destroy(uid);
    return res.json({
      statusCode: 200,
      response: destroy,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const update = await UsersManager.update(uid, data);
    return res.json({
      statusCode: 200,
      response: update,
    });
  } catch (error) {
    return next(error);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
