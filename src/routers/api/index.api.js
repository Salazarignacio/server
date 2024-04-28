import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./user.router.js";
import cartRouter from "./carts.router.js";

const apiRouter = Router();

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/carts', cartRouter)

export default apiRouter