import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./user.router.js";
import cartRouter from "./carts.router.js";
import ticketsRouter from "./tickets.router.js";

const apiRouter = Router();

apiRouter.use('/products', productsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/carts', cartRouter)
apiRouter.use('/tickets', ticketsRouter)

export default apiRouter