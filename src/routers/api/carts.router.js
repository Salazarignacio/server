import { Router } from "express";
/* import iCarts from "../../data/fs/CartsManager.js"; */
import CartsManagerMongo from "../../data/mongo/CartsManager.js";

const cartRouter = Router();

cartRouter.post("/", create);
cartRouter.get("/", read);
cartRouter.delete("/:oid", destroy);
cartRouter.get("/category/:oid", readOne);
cartRouter.get("/paginate", paginate);

async function paginate(req, res, next) {
  try {
    const opts = {};
    const filter = {};
    if (req.query.state) {
      filter.state = req.query.state;
    }
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const all = await CartsManagerMongo.paginate({ filter, opts });
    res.json({
      statusCode: 200,
      response: all.docs,
    });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const cart = await CartsManagerMongo.read();
    return res.json({
      statusCode: 200,
      message: "cart router",
      req: cart,
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const create = await CartsManagerMongo.create(req.body);
    return res.json({
      statusCode: 201,
      message: "created succesfully",
      req: create,
    });
  } catch (error) {
    next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { oid } = req.params;
    const readOne = await CartsManagerMongo.readOne(oid);
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
    const { oid } = req.params;
    console.log(oid);
    const destroy = await CartsManagerMongo.destroy(oid);
    return res.json({
      statusCode: 200,
      req: destroy,
    });
  } catch (error) {
    next(error);
  }
}

export default cartRouter;
