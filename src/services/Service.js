class Service {
  constructor(repository) {
    this.repository = repository;
  }
  createService = async (data) => {
    const create = await this.repository.createRepository(data);
    return create;
  };
  readService = async () => {
    const read = await this.repository.readRepository();
    return read;
  };
  readOneService = async (id) => {
    const readOne = await this.repository.readOneRepository(id);
    return readOne;
  };
  readByEmailService = async (email) => {
    const readEmail = await this.repository.readByEmailRepository(email);
    return readEmail;
  };
  destroyService = async (id) => {
    const destroy = await this.repository.destroyRepository(id);
    return "File deleted ID: " + destroy._id;
  };
  updateService = async (id, data) => {
    const update = await this.repository.updateRepository(id, data);
    
    return update;
  };
  paginateService = async ({ filter, opts }) => {
    const paginate = await this.repository.paginateRepository({ filter, opts });
    return paginate;
  };
}

export default Service;
