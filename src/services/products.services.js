import Service from "./Service.js";
import ProductsManagerMongo from "../data/mongo/ProductsManager.js";

const productService = new Service(ProductsManagerMongo);
export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productService;
