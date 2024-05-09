import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", async (req, res, next) => {
  try {
    return res
      .cookie("clave", "valor", { maxAge: 10000 })
      .cookie("hoy", "fulbo", { maxAge: 5000 })
      .json({ message: "la cookie esta aca" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get('/get', async (req,res,next)=>{
    try {
        const cookieGuardada = req.cookies
        return res.json({cookieGuardada})
        return
    } catch (error) {
        return next(error)
    }
})

export default cookiesRouter;
