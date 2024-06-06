import UsersManager from "../data/mongo/UsersManager.js";

class Service {
  constructor(manager) {
    this.model = manager;
  }
  createService = async (data) => {
    const create = await this.model.create(data);
    return create;
  };
  readOneService = async (id) => {
    const readOne = await this.model.readOne(id);
    return readOne;
  };
  readByEmailService = async (email) => {
    const readEmail = await this.model.readByEmail(email);
    return readEmail;
  };
  destroyService = async (id) => {
    const destroy = await this.model.destroy(id);
    return "user deleted ID: " + destroy._id;
  };
  updateService = async (id, data) => {
    const update = await this.model.update(id, data);
    return update;
  };
}

export default Service;
