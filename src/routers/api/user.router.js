import { Router } from "express";
import iUsers from "../../data/fs/UserManager.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await iUsers.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID " + create.id,
    });
  } catch (error) {
    next(error);
  }
}
async function read(req, res) {
  try {
    const read = await iUsers.read();
    
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
    const { uid } = req.params;
    const readOne = await iUsers.readOne(uid);
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
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const destroy = await iUsers.destroy(uid);
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
    const { uid } = req.params;
    const data = req.body;
    const update = await iUsers.update(uid, data);
    return res.json({
      statusCode: 200,
      response: update,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;
