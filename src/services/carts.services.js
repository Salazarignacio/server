import Service from "./Service.js";
import CartsManagerMongo from "../data/mongo/CartsManager.js";
import cartsRepository from "../repositories/carts.rep.js";

const cartsServices = new Service(cartsRepository);
export const {
  paginateService,
  readService,
  createService,
  readOneService,
  destroyService,
  updateService,
} = cartsServices;
