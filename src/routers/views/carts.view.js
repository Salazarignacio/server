import { Router } from "express";
import iCarts from "../../data/fs/CartsManager.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/", async (req, res, next) => {
  try {
    const carts = await iCarts.read();
    return res.render("carts", { carts });
  } catch (error) {
    next(error);
  }
});

export default cartsViewRouter