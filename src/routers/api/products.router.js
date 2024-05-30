import CustomRouter from "./CustomRouter.js";
/* import ProductManagerMongo from '../../data/fs/ProductManager.js' */
import ProductsManagerMongo from "../../data/mongo/ProductsManager.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], create);
    this.destroy("/:pid", ["ADMIN"], destroy);
    this.update("/:pid", ["ADMIN"], update);

    async function paginate(req, res, next) {
      try {
        const filter = {};
        const opts = {};
        if (req.query.limit) {
          opts.limit = req.query.limit;
        }
        if (req.query.page) {
          opts.page = req.query.page;
        }
        if (req.query._id) {
          filter._id = req.query._id;
        }
        if (req.query.category) {
          filter.category = req.query.category;
        }

        const all = await ProductsManagerMongo.paginate({ filter, opts });
        const info = {
          totalDocs: all.totalDocs,
          page: all.page,
          totalPages: all.totalPages,
          limit: all.limit,
          prevPage: all.prevPage,
          nextPage: all.nextPage,
        };

        return res.paginate(all.docs, info);
      } catch (error) {
        next(error);
      }
    }
    async function create(req, res, next) {
      try {
        const data = req.body;
        const create = await ProductsManagerMongo.create(data);
        return res.response201("created succesfully");
      } catch (error) {
        return next(error);
      }
    }
    async function read(req, res, next) {
      try {
        const read = await ProductsManagerMongo.read();

        if (read.length > 0) {
          return res.response200(read);
        } else {
          return res.error404("FILE NOT FOUND");
        }
      } catch (error) {
        return next(error);
      }
    }

    async function readOne(req, res, next) {
      try {
        const { pid } = req.params;
        const readOne = await ProductsManagerMongo.readOne(pid);
        if (readOne) {
          return res.response200(readOne);
        } else {
          return res.error404("FILE NOT FOUND");
        }
      } catch (error) {
        return next(error);
      }
    }

    async function destroy(req, res, next) {
      try {
        const { pid } = req.params;
        const destroy = await ProductsManagerMongo.destroy(pid);
        return res.response200(destroy);
      } catch (error) {
        return next(error);
      }
    }
    async function update(req, res, next) {
      try {
        const { pid } = req.params;
        const data = req.body;
        const update = await ProductsManagerMongo.update(pid, data);
        return res.response200(update);
      } catch (error) {
        return next(error);
      }
    }
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
