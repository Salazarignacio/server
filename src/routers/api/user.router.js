import CustomRouter from "./CustomRouter.js";
import UsersManager from "../../data/mongo/UsersManager.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], passportCb("jwt"), readOne);
    this.create("/", ["ADMIN"], create);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
    this.read("/email/:email", ["PUBLIC"], readByEmail);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await UsersManager.create(data);
    return res.response201("Created " + create.id);
  } catch (error) {
    next(error);
  }
}
async function read(req, res, next) {
  try {
    const read = await UsersManager.readOne(req.user._id);
    if (read.length > 0) {
      return res.reponse200(read);
    } else {
      return res.error400("File not found");
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const readOne = await UsersManager.readOne(req.user._id);
    if (readOne) {
      return res.response200(readOne);
    } else {
      return res.error400("ID not found");
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
      res.response200(readMail);
    } else {
      return res.error404("Email not found");
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const destroy = await UsersManager.destroy(uid);
    return res.response200(destroy);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const update = await UsersManager.update(uid, data);
    return res.response200(update);
  } catch (error) {
    return next(error);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
