import log from '../../utils/winston.utils.js'
/* aca hay que hacer la importacion dinamica */

function winston(req, res, next) {
  req.logger = log;
  const message = `${req.method} ${
    req.url
  } - ${new Date().toLocaleTimeString()}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;