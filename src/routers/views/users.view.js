import { Router } from "express";/* 
import iUsers from "../../data/fs/UserManager.js"; */
import UsersManager from "../../data/mongo/UsersManager.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersManager.read();
    console.log('hola');
    return res.render("users", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const readOne = await UsersManager.readOne(uid);
    return res.render("usersDetails", { user: readOne });
  } catch (error) {
    next(error);
  }
});

 usersRouter.get('/register', async (req,res,next)=>{
  try {
    return res.render('realUsers', {title: "real"})
  } catch (error) {
    next(error)
  }
}) 

export default usersRouter;
