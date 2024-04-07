import { Router } from "express";
import iProducts from '../../data/fs/ProductManager.js'

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", create);
productsRouter.delete("/:pid", destroy);
productsRouter.put("/:pid", update);

async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await iProducts.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + create.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function read(req, res) {
  try {
    const read = await iProducts.read();

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
    const readOne = await iProducts.readOne(pid);
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
    const destroy = await iProducts.destroy(pid);
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
    const update = await iProducts.update(pid, data);
    return res.json({
        statusCode: 200,
        response: update });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;