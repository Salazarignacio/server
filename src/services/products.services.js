import Service from "./Service.js";
import ProductsManagerMongo from "../data/mongo/ProductsManager.js";
import dao from "../data/dao.factory.js";

const { products } = dao;

const productService = new Service(products);
export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productService;
