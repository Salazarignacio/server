/* import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);
router.use("/chat", async (req, res, next) => {
  return res.render("chat", { title: "chat" });
});

export default router;
*/
import CustomRouter from "./api/CustomRouter.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}

const router = new IndexRouter();

export default router.getRouter();
