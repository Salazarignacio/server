import dao from "../data/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";

const { products } = dao;

class ProductsRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepository = async (data) => {
    /* en users agregar usersDto */
    data = new ProductsDTO(data);
    const create = await this.model.create(data);
    return create;
  };
  readRepository = async () => {
    const read = await this.model.read();
    return read;
  };
  readOneRepository = async (id) => {
    const readOne = await this.model.readOne(id);
    return readOne;
  };
  readByEmailRepository = async (email) => {
    const readEmail = await this.model.readByEmail(email);
    return readEmail;
  };
  destroyRepository = async (id) => {
    const destroy = await this.model.destroy(id);
    return "File deleted ID: " + destroy._id;
  };
  updateRepository = async (id, data) => {
    const update = await this.model.update(id, data);
    return update;
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

const productsRepository = new ProductsRepository(products);

export default productsRepository;
