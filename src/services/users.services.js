import Service from "./Service.js";
import usersRepository from "../repositories/users.rep.js";

const userService = new Service(usersRepository);
export const {
  createService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
  readService,
} = userService;
