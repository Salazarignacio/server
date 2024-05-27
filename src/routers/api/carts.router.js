import CustomRouter from "./CustomRouter.js";
import CartsManagerMongo from "../../data/mongo/CartsManager.js";



class CartRouter extends CustomRouter {
  init() {
    this.create("/", create);
    this.read("/", paginate);
    this.destroy("/:oid", destroy);
    this.read("/readone/:oid", readOne);
    this.read("/paginate", paginate);
    this.update("/:oid", update);
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

async function update(req, res, next) {
  try {
    const { oid } = req.params;
    const data = req.body;
    const update = await CartsManagerMongo.update(uid, data);
    return res.json({
      statusCode: 200,
      response: update,
    });
  } catch (error) {
    return next(error);
  }
}

const cartRouter = new CartRouter();
export default cartRouter.getRouter();
