import passport from "passport";

function passportCb(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.json({
        statusCode: info.statusCode || 401,
        message: info.message,
      });
    })(req, res, next);
  };
}


export default passportCb