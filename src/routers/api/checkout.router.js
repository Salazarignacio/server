import { Router } from "express";
import checkout from "../../controllers/checkout.controller.js";

const checkoutRouter = Router();

checkoutRouter.post("/checkout", checkout);

export default checkoutRouter;
