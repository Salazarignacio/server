import sendEmail from "../../utils/mailing.util.js";
import CustomRouter from "./api/CustomRouter.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import { fork } from "child_process";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
    this.create("/api/nodemailer", ['PUBLIC'],async (req, res, next) => {
      try {
        const { email, name } = req.body;
        await sendEmail({
          to: email,
          name,
        });
        return res.response200("EMAIL SENT");
      } catch (error) {
        return next(error);
      }
    });
    this.use("/fork", (req, res, next) => {
      const childProcess = fork("./src/utils.js/test.utils.js");
      childProcess.send("start");
      childProcess.on("message", (result) => {
        return res.json({ result });
      });
    });
  }
}

const router = new IndexRouter();

export default router.getRouter();
