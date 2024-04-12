import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router(); 

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