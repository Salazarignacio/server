import CustomRouter from "./CustomRouter.js";
import CartsManager from "../../data/mongo/CartsManager.js";
import { Types } from "mongoose";
import passportCb from "../../middlewares/passportCb.mid.js";
import TicketsManagerMongo from "../../data/mongo/TicketsManager.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read(
      "/",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async (req, res, next) => {
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
                  $mergeObjects: [
                    { $arrayElemAt: ["$product_id", 0] },
                    "$$ROOT",
                  ],
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
            total: ticket.total,
          });
        } catch (error) {
          next(error);
        }
      }
    );
    this.read(
      "/read",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          const read = await TicketsManagerMongo.read();
          return res.json({
            statusCode: 200,
            response: read,
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read(
      "/readOne",
      ["ADMIN", "USER"],
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          const id = req.user._id;
          const readOne = await TicketsManagerMongo.readOne(
            "663bbaf118b1a27fac1ac9c9"
          );

          return res.json({ statusCode: 200, response: readOne });
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}
const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
