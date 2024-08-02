
import winston from "../../utils/winston.utils.js"

function errorHandler(error, req, res, next) {
  const message = `${req.method} ${req.url} ${
    error.statusCode
  } . ${new Date().toLocaleTimeString()} ${error}`;
  winston.ERROR(message);
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "API ERROR",
  });
}

export default errorHandler;
