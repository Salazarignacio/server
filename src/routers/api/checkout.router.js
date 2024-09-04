import { Router } from "express";
import checkout from "../../controllers/checkout.controller.js";

const checkoutRouter = Router();
async function che() {
  return { saludo: "hola amigo" };
}

checkoutRouter.post("/checkout", checkout);
checkoutRouter.get("/che", che);

export { checkoutRouter };
