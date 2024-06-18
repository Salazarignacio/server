import dao from "../data/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";

const { carts } = dao;

class CartsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    data = new CartsDTO(data);
    const create = await this.model.create(data);
    return create;
  };
  readRepository = async (role) => {
    const read = await this.model.readRepository(role);
    return read;
  };
  readOneRepository = async (uid) => {
    const readOne = await this.model.readOne(uid);
    return readOne;
  };
  updateRepository = async (uid, data) => {
    const update = await this.model.update(uid, data);
    return update;
  };
  destroyRepository = async (uid) => {
    const destroy = await this.model.destroy(uid);
    return destroy;
  };
  paginateRepository = async ({ filter, opts }) => {
    try {
      const all = await this.model.paginate({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };
}

const cartsRepository = new CartsRepository(carts);
export default cartsRepository;
