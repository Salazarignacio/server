import { Router } from "express";
import { checkout } from "../../controllers/checkout.controller.js";
import { verifyToken } from "../../../utils/token.utils.js";

const checkoutRouter = Router();

checkoutRouter.post("/", checkout);

export default checkoutRouter;

/* con el customRouter me devolvia
"ERROR: GET /api/payment/che undefined . 
07:12:05 TypeError: callback.apply is not a function"
*/
