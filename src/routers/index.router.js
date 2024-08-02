import sendEmail from "../../utils/mailing.util.js";
import recoverPass from "../../utils/recoverPass.js";
import CustomRouter from "./api/CustomRouter.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import { fork } from "child_process";
import { readByEmailService, updateService } from "../services/users.services.js";
import crypto from 'crypto'


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
    this.create("/api/password", ['PUBLIC'],async (req, res, next) => {
      try {
        const { email, name } = req.body;
        let user = await readByEmailService(email);
        const updateUser = await updateService(user._id, {verifyCode: crypto.randomBytes(12).toString("hex")})
        user = await readByEmailService(email)
        await recoverPass({
          to: email,
          code: user.verifyCode,
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
