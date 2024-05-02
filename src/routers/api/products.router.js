import { Router } from "express";
/* import ProductManagerMongo from '../../data/fs/ProductManager.js' */
import ProductsManagerMongo from "../../data/mongo/ProductsManager.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/paginate", paginate);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", create);
productsRouter.delete("/:pid", destroy);
productsRouter.put("/:pid", update);

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

    const all = await ProductsManagerMongo.paginate({filter, opts});
    console.log(filter);
    console.log(opts.limit);
    console.log(all.limit);
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        limit: all.limit,
        page: opts.page,
        _id: filter._id,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await ProductsManagerMongo.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + create.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function read(req, res, next) {
  try {
    const read = await ProductsManagerMongo.read();

    if (read.length > 0) {
      return res.json({
        statusCode: 200,
        message: read,
      });
    } else {
      const error = new Error("FILE NOT FOUND");
      error.statusCode = 404;
      throw error;
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
      return res.json({
        statusCode: 200,
        message: readOne,
      });
    } else {
      const error = new Error("ID NOT FOUND IN FILE");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const destroy = await ProductsManagerMongo.destroy(pid);
    return res.json({
      statusCode: 200,
      response: destroy,
    });
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const update = await ProductsManagerMongo.update(pid, data);
    return res.json({
      statusCode: 200,
      response: update,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
