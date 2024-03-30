import { Router } from "express";
import productsRouter from "./products.router.js";

const apiRouter = Router();

apiRouter.use('/products', productsRouter)

export default apiRouter