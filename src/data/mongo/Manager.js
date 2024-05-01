class Manager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const file = this.model.create(data);
      return file;
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      const readFile = await this.model.find();
      return readFile
    } catch (error) {
        throw error
    }
  }
  async paginate(filter, sortAndPaginate){
    try {
      const paginate = await this.model.paginate(filter, sortAndPaginate)
      return paginate
    } catch (error) {
      throw error
    }
  }
  async readOne(id){
    try {
        const readOneFile = await this.model.findById(id)
        return readOneFile
    } catch (error) {
        throw error
    }
  }
  async update(id, data){
    try {
        const update = await this.model.findByIdandUpdate(id, data, {new: true})
        return update
    } catch (error) {
        throw error
    }
  }
  async destroy(id){
    try {
        const destroy = await this.model.findByIdandDelete(id)        
        return destroy
    } catch (error) {
        throw error
    }
  }
}

export default Manager