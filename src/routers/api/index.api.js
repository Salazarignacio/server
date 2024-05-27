import CustomRouter from "./CustomRouter.js";

import productsRouter from "./products.router.js";
import usersRouter from "./user.router.js";
import cartRouter from "./carts.router.js";
import ticketsRouter from "./tickets.router.js";
import cookiesRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
  }
}
const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
