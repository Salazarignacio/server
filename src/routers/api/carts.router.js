import CustomRouter from "./CustomRouter.js";
import {
  create,
  paginate,
  destroy,
  readOne,
  update,
} from "../../controllers/carts.controllers.js";

class CartRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", 'USER'], create);
    this.read("/", ["PUBLIC"], paginate);
    this.destroy("/:oid", ["ADMIN"], destroy);
    this.read("/readone/:oid", ["PUBLIC"], readOne);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.update("/:oid", ["ADMIN"], update);
  }
}

const cartRouter = new CartRouter();
export default cartRouter.getRouter();
