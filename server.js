import express from "express";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import {createServer} from 'http'
import { Server} from 'socket.io'
import socketCb from './src/routers/index.socket.js'

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer)
socketServer.on('connection', socketCb)
socketServer.emit("general", { text: "to all"})
nodeServer.listen(PORT, ready);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");


/* middlewares */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
/* implementacion de morgan */
server.use(morgan("dev"));
server.use("/", router);

server.use(errorHandler);
server.use(pathHandler);
