import log from "../../utils/winston.utils.js";
import arg from "../../utils/args.utils.js";
import loggerProd from "../../utils/winston.prod.js";

function winston(req, res, next) {
  req.logger = log;
  if (arg.enve == "prod") {
    req.logger = loggerProd;
  }
  const message = `${req.method} ${
    req.url
  } - ${new Date().toLocaleTimeString()}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;
