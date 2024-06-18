import dao from "../data/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";

const { users } = dao;

class UsersRepository {
  constructor(manager) {
    this.model = manager;
  }
  createRepositoty = async (data) => {
    data = new UsersDTO(data);
    const create = await this.model.create(data);
    return data;
  };
  readReoisitory = async () => {
    const read = await this.model.read;
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
}

const usersRepository = new UsersRepository(users);

export default usersRepository;
