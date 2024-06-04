import CustomRouter from "./api/CustomRouter.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";
import fork from 'child_process'

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
    this.use("/fork", (req, res, next) => {
      let result = 0;
     const childProcess = fork('./src/utils.js/test.utils.js')
      childProcess.sed('start')
      childProcess.on('message', result=>{
        return res.json({result})
      })
      return res.json({ result });
    });
  }
}

const router = new IndexRouter();

export default router.getRouter();
