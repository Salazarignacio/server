import { Router } from "express";
import iProducts from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await iProducts.read();
    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const readOne = await iProducts.readOne(pid);
    return res.render("details", { product: readOne });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
