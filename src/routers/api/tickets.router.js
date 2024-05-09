import { Router, response } from "express";
import CartsManager from "../../data/mongo/CartsManager.js";
import { Types } from "mongoose";

const ticketsRouter = Router();

ticketsRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const ticket = await CartsManager.aggregate([
      {
        $match: { user_id: new Types.ObjectId(uid) },
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
    });
  } catch (error) {
    next(error);
  }
});

export default ticketsRouter;
