import { createLogger, format, addColors, transports } from "winston";
const { colorize, simple } = format;
const { Console, File } = transports;

const levels = { ERROR: 0, ERROR: 1, INFO: 2, HTTP: 3 };

const colors = { ERROR: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors);

const logger = createLogger({
  levels,
  format: colorize(),
  transports: [
    new Console({ level: "HTTP", format: simple() }),
    new File({
      level: "ERROR",
      format: simple(),
      filename: "./utils/errors/errors.log",
    }),
  ],
});

export default logger;
