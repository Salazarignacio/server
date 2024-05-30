import CustomRouter from "./CustomRouter.js";
import CartsManagerMongo from "../../data/mongo/CartsManager.js";

class CartRouter extends CustomRouter {
  init() {
    this.create("/", ['ADMIN'], create);
    this.read("/", ['PUBLIC'],paginate);
    this.destroy("/:oid", ['ADMIN'],destroy);
    this.read("/readone/:oid",['PUBLIC'], readOne);
    this.read("/paginate", ['PUBLIC'],paginate);
    this.update("/:oid",['ADMIN'], update);
  }
}

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
    res.response200(all.docs);
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const cart = await CartsManagerMongo.read();
    return res.response200(cart);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const create = await CartsManagerMongo.create(req.body);
    return res.response201("created succesfully");
  } catch (error) {
    next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { oid } = req.params;
    const readOne = await CartsManagerMongo.readOne(oid);
    if (readOne) {
      return res.response200(readOne);
    } else {
      return res.error400('Id not found');
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
    return res.response(destroy);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { oid } = req.params;
    const data = req.body;
    const update = await CartsManagerMongo.update(oid, data);
    return res.response200(update);
  } catch (error) {
    return next(error);
  }
}

const cartRouter = new CartRouter();
export default cartRouter.getRouter();
