import log from "../../utils/winston.utils.js";
import arg from "../../utils/args.utils.js";
/* aca hay que hacer la importacion dinamica */

function winston(req, res, next) {
  /* si arg.env == prod o arg.env == dev */
  req.logger = log;
  const message = `${req.method} ${
    req.url
  } - ${new Date().toLocaleTimeString()}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;
