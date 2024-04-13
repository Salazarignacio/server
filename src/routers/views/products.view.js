import { Router } from "express";
import iProducts from "../../data/fs/ProductManager.js";

const productsViewRouter = Router();

productsViewRouter.get("/", async (req, res, next) => {
  try {
    const products = await iProducts.read();
    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
});

productsViewRouter.get("/details/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const readOne = await iProducts.readOne(pid);
    return res.render("productsDetails", { product: readOne });
  } catch (error) {
    next(error);
  }
});

productsViewRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("realProduct", { title: "real" });
  } catch (error) {
    next(error);
  }
});

export default productsViewRouter;
