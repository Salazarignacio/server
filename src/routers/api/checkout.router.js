import { Router } from "express";
import { checkout } from "../../controllers/checkout.controller.js";
import { verifyToken } from "../../../utils/token.utils.js";

const checkoutRouter = Router();

async function che(req, res, next) {
  let user = req.cookies["token"];
  user = verifyToken(user);
  return res.json({ saludo: user });
}

checkoutRouter.post("/checkout", checkout);
checkoutRouter.get("/che", che);

export default checkoutRouter;

/* con el customRouter me devolvia
"ERROR: GET /api/payment/che undefined . 
07:12:05 TypeError: callback.apply is not a function"
*/
