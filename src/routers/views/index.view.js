import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsViewRouter from "./carts.view.js";

const viewsRouter = Router();

viewsRouter.use("/carts", cartsViewRouter);
viewsRouter.use("/products", productsViewRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", { title: "HOME" });
  } catch (error) {
    return next(error);
  }
});
/* por ahora declaro el endpoint aca */
viewsRouter.get("/login", async (req, res, next) => {
  try {
    const text = "Login";
    return res.render("login", { text });
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("signIn", { title: "real" });
  } catch (error) {
    return next(error);
  }
});
viewsRouter.get("/verify", async (req, res, next) => {
  try {
    return res.render("verified", { title: "verify" });
  } catch (error) {
    return next(error);
  }
});

viewsRouter.get("/recovery", async(req,res,next)=>{
  try {
    return res.render("recovery", {title:"recovery"})
  } catch (error) {
    return next(error)
  }
})
viewsRouter.get("/email", async(req,res,next)=>{
  try {
    return res.render("getEmail", {title:"Email"})
  } catch (error) {
    return next(error)
  }
})

export default viewsRouter;
