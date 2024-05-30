import CustomRouter from "./CustomRouter.js";
import { Router, response } from "express";
import CartsManager from "../../data/mongo/CartsManager.js";
import { Types } from "mongoose";
import passportCb from "../../middlewares/passportCb.mid.js";
import TicketsManagerMongo from "../../data/mongo/TicketsManager.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.create("/",['PUBLIC'], passportCb("jwt"),async (req, res, next) => {
      /* POST ******* */
      try {
        const user = req.user._id;
        const ticket = await CartsManager.aggregate([
          {
            $match: { user_id: new Types.ObjectId(user) },
          },
          {
            $lookup: {
              foreignField: "_id",
              from: "products",
              localField: "product_id",
              as: "product_id",
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
              },
            },
          },
          { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
          { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
          {
            $project: {
              _id: 0,
              user_id: "$_id",
              total: "$total",
              date: new Date(),
            },
          },
          { $merge: { into: "tickets" } },
        ]);
        return res.json({
          statusCode: 200,
          response: ticket,
          user: user,
        });
      } catch (error) {
        next(error);
      }
    });
    this.read("/",['PUBLIC'], passportCb("jwt"),  async (req, res, next) => {
      try {
        const read = await TicketsManagerMongo.read()
        return res.json({
          statusCode: 200,
          response: read
        })
      } catch (error) {
        return next(error);
      }
    });
  }
}
const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
