import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./user.router.js";

const apiRouter = Router();

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)

export default apiRouter