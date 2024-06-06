import Service from "./Service.js";
import CartsManagerMongo from "../data/mongo/CartsManager.js";

const cartsServices = new Service(CartsManagerMongo);
export const {
  paginateService,
  readService,
  createService,
  readOneService,
  destroyService,
  updateService,
} = cartsServices;
