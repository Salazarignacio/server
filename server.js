import express from "express";
import errorHandler from "./data/middlewares/errorHandler.mid.js";
import pathHandler from "./data/middlewares/pathHandler.mid.js";
import router from "./data/routers/index.router.js";
import morgan from "morgan";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

/* middlewares */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
/* implementacion de morgan */
server.use(morgan("dev"));
server.use("/", router);

server.use(errorHandler);
server.use(pathHandler);
