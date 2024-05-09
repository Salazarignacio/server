import "dotenv/config.js";
import express from "express";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/routers/index.socket.js";
import dbConnect from "./src/utils/dbConect.util.js";
import cookieParser from "cookie-parser";

const server = express();


const PORT = process.env.PORT || 9000;
const ready = async () => {
  console.log("server ready on port " + PORT);
  await dbConnect(PORT, ready)
};

const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };
nodeServer.listen(PORT, ready);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
/* implementacion de morgan */
server.use(morgan("dev"));
server.use("/", router);

server.use(errorHandler);
server.use(pathHandler);
server.use(cookieParser());
