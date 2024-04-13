import { Router } from "express";
import iUsers from "../../data/fs/UserManager.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await iUsers.read();
    return res.render("users", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/details/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const readOne = await iUsers.readOne(uid);
    return res.render("usersDetails", { user: readOne });
  } catch (error) {
    next(error);
  }
});

 usersRouter.get('/real', async (req,res,next)=>{
  try {
    return res.render('realUsers', {title: "real"})
  } catch (error) {
    next(error)
  }
}) 

export default usersRouter;
