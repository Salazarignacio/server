import Product from "./models/product.model.js";
import Manager from "./Manager.js";

const ProductsManagerMongo = new Manager(Product);
export default ProductsManagerMongo;
