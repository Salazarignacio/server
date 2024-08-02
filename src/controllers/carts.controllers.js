import {
  createService,
  readOneService,
  destroyService,
  updateService,
  paginateService,
} from "../services/carts.services.js";

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

    const all = await paginateService({ filter, opts });
    res.response200(all.docs);
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  try {
    const cart = await readOneService();
    return res.response200(cart);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const create = await createService(req.body);
    return res.response201("created succesfully");
  } catch (error) {
    next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { oid } = req.params;
    const readOne = await readOneService(oid);
    if (readOne) {
      return res.response200(readOne);
    } else {
      return res.error400("Id not found");
    }
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    const { oid } = req.params;
    console.log(oid);
    const destroy = await destroyService(oid);
    return res.response(destroy);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { oid } = req.params;
    const data = req.body;
    const update = await updateService(oid, data);
    return res.response200(update);
  } catch (error) {
    return next(error);
  }
}

export { paginate, read, readOne, destroy, update, create };
