import { createLogger, format, addColors, transports } from "winston";
const { colorize, simple } = format;
const { Console, File } = transports;
import args from "./args.utils.js";

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors);

let logger;

if (args.env === "dev") {
  logger = createLogger({
    levels,
    format: colorize(),
    transports: [new Console({ level: "HTTP", format: simple() })],
  });
} else if (args.env === "prod") {
  logger = createLogger({
    levels,
    format: simple(), // No colorize() in production
    transports: [
      new Console({ level: "HTTP", format: simple() }),
      new File({
        level: "ERROR",
        format: simple(),
        filename: "./utils/errors/errors.log",
      }),
    ],
  });
}

export default logger;
