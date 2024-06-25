import CustomRouter from "./CustomRouter.js";
import {
  create,
  paginate,
  read,
  readOne,
  destroy,
  update,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], create); 
    this.destroy("/:pid", ["ADMIN"], destroy);
    this.update("/:pid", ["ADMIN"], update);
    
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
