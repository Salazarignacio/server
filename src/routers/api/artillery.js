import CustomRouter from "./CustomRouter.js";

class ArtilleryRouter extends CustomRouter {
  init() {
    this.read("/simplex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 0; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/complex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 0; i < 1000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}
const artillery = new ArtilleryRouter();
export default artillery.getRouter();
