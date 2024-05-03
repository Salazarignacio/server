import { Router, response } from "express";
import TicketsManager from "../../data/mongo/Tickets.Manager.js";

const ticketsRouter = Router();

ticketsRouter.get("/", read);
ticketsRouter.get("/paginate", paginate);
ticketsRouter.post("/", create);

async function paginate(req, res, next) {
  try {
    const opts = {};
    const filter = {};
    if (req.query.user) {
      filter.user = req.query.user;
    }
    const all = await TicketsManager.paginate({ filter, opts });
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
    const read = await TicketsManager.read();
    return res.json({
      statusCode: 200,
      response: read,
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await TicketsManager.create(data);
    return res.json({
      statusCode: 201,
      response: create,
    });
  } catch (error) {
    next(error);
  }
}

export default ticketsRouter;
