import {
  createService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} from "../services/users.services.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    createService(data);
    return res.response201("Created " + create._id);
  } catch (error) {
    next(error);
  }
}
async function read(req, res, next) {
  try {
    const read = await readOneService(req.user._id);
    if (read.length > 0) {
      return res.reponse200(read);
    } else {
      return res.error400("File not found");
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const readOne = await readOneService(req.user._id);
    if (readOne) {
      return res.response200(readOne);
    } else {
      return res.error400("ID not found");
    }
  } catch (error) {
    next(error);
  }
}

async function readByEmail(req, res, next) {
  try {
    const { email } = req.params;
    const readMail = await readByEmailService(email);
    if (readMail) {
      res.response200(readMail);
    } else {
      return res.error404("Email not found");
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const destroy = await destroyService(uid);
    return res.response200(destroy);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const update = await updateService(uid, data);
    return res.response200(update);
  } catch (error) {
    return next(error);
  }
}

export { create, read, readOne, destroy, update, readByEmail };
