import CustomRouter from "./CustomRouter.js";
import {
  create,
  read,
  readOne,
  readByEmail,
  destroy,
  update,
  updatePassword,
} from "../../controllers/users.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/ru", ["PUBLIC"], passportCb("jwt"), readOne);
    this.read("/", ["PUBLIC"], read);
    this.create("/", ["ADMIN"], create);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
    this.read("/email/:email", ["PUBLIC"], readByEmail);
    this.create("/password", ["PUBLIC"], updatePassword);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
