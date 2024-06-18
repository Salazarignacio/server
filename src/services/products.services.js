import Service from "./Service.js";
/* import dao from "../data/dao.factory.js"; */
/* importar el productsRepositoy, instancia de repository */
/* const { products } = dao; */
import productsRepository from "../repositories/products.rep.js";

const productsService = new Service(productsRepository);
export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productsService;
