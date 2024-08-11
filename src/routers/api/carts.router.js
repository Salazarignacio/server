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
    this.create("/", ["PREM", 'USER'], create);
    this.read("/", ["PUBLIC"], paginate);
    this.destroy("/:oid", ["ADMIN", "USER", "PREM"], destroy);
    this.read("/readone/:oid", ["PUBLIC"], readOne);
    this.read("/paginate", ["USER", "PREM", "ADMIN"], paginate);
    this.update("/:oid", ["USER", "PREM", "ADMIN"], update);
  }
}

const cartRouter = new CartRouter();
export default cartRouter.getRouter();
