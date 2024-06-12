import { Router, response } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", async (req, res, next) => {
  let query = "holaa";
  try {
    if (req.query.nombre) {
      query = req.query;
    }
    return res
      .cookie("clave", "valor")
      .json({ message: query });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const cookieGuardada = req.cookies;
    return res.json({ cookieGuardada });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/clear", async (req, res, next) => {
  try {
    return res.clearCookie("modo").json({ response: "borrada" });
  } catch (error) {
    return next(error);
  }
});
cookiesRouter.get('/testing', async (req, res, next)=>{
  try {
    return res.json('hola nacho')
  } catch (error) {
    return next(error)
  }
})

export default cookiesRouter;
