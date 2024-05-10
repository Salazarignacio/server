import { Router, response } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", async (req, res, next) => {
  let nacho = "";
  try {
    if (req.query.nombre) {
      nacho = req.query;
      
    }
    return res
      .cookie("clave", "valor", { maxAge: 10000})
      .cookie("modo", "diablo", { maxAge: 10000 })
      .cookie("nombre", nacho, { maxAge: 10000 })

      .json({ message: nacho });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const cookieGuardada = req.signedCookies;
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

export default cookiesRouter;
