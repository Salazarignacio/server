import { Router, response } from "express";
/* import iCarts from "../../data/fs/CartsManager.js"; */
import CartsManagerMongo from "../../data/mongo/CartsManager.js";

const cartRouter = Router();

cartRouter.get("/", read);
cartRouter.post("/", create);
cartRouter.get("/paginate", paginate);

async function paginate(req, res, next) {
  try {
    const opts = {};
    const filter = {};
    if (req.query.state) {
      filter.state = req.query.state;
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

export default cartRouter;
