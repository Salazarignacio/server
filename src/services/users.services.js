import Service from "./Service.js";
import UsersManager from "../data/mongo/UsersManager.js";
import iUsers from "../data/fs/UserManager.js";

const userService = new Service(UsersManager);
export const {
  createService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = userService;
