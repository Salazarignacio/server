import Service from "./Service.js";
import ProductsManagerMongo from "../data/mongo/ProductsManager.js";
import iProducts from "../data/fs/ProductManager.js";

const productService = new Service(ProductsManagerMongo);
export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productService;
