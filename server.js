import environment from "./utils/env.util.js";
import express from "express";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
/* import morgan from "morgan"; */
import winston from "./src/middlewares/winston.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/routers/index.socket.js";
/* import dbConnect from "./src/utils/dbConect.util.js"; */
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import args from "./utils/args.utils.js";
import cors from "cors";
import compression from "express-compression";
import cluster from "cluster";
import { cpus } from "os";

const server = express();

const PORT = args.p || environment.PORT;
const ready = async () => {
  console.log("server ready on port " + PORT);
  /* await dbConnect(PORT, ready); */
};
console.log(args);

const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };
const numberOfProcess = cpus().length;
if (cluster.isPrimary) {
  for (let i = 1; i <= numberOfProcess; i++) {
    cluster.fork();
  }
  console.log("primary");
} else {
  console.log("worker", process.pid);
  nodeServer.listen(PORT, ready);
}

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* middlewares */
server.use(cors({ origin: true, credentials: true }));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
/* server.use(morgan("dev")); */
server.use(winston);
server.use(cookieParser("secret"));

server.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: environment.MONGO_URI, ttlo: 60 * 60 }),
  })
);
server.use("/", router);

server.use(errorHandler);
server.use(pathHandler);
