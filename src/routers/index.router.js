import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);
router.use("/chat", async (req, res, next) => {
  return res.render("chat", { title: "chat" });
});

export default router;
