import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsViewRouter from "./carts.view.js";

const viewsRouter = Router(); 

viewsRouter.use('/carts', cartsViewRouter)
viewsRouter.use('/products', productsViewRouter)
viewsRouter.use('/users', usersRouter)
viewsRouter.get('/', (req,res,next)=>{
    try {
        return res.render('index', {title: 'HOME'})
    } catch (error) {
        next(error)
    }
})

export default viewsRouter