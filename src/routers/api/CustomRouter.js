import { Router } from "express";
import { verifyToken } from "../../../utils/token.utils.js";
import usersRepository from "../../repositories/users.rep.js";
import winston from "../../middlewares/winston.mid.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }

  /* responses */
  response = (req, res, next) => {
    res.response200 = (response) => res.json({ statusCode: 200, response });
    res.response201 = (response) => res.json({ statusCode: 201, response });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });

    /* errors */
    res.error400 = (message) => {
      const errorMessage = `${req.method} ${
        req.url
      } 400 - ${new Date().toLocaleTimeString()} - ${message}`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 400, message: message });
    };
    res.error401 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 401 - ${new Date().toLocaleTimeString()} - Bad auth from poliecies!}`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 401, message: "Bad auth from poliecies!" });
    };

    res.error403 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 403 - ${new Date().toLocaleTimeString()} - Forbidden from poliecies!`;
      winston.ERROR(errorMessage);
      return res.json({
        statusCode: 403,
        message: "Forbidden from poliecies!",
      });
    };
    res.error404 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 404 - ${new Date().toLocaleTimeString()} - Not found docs`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 404, message: "Not found docs" });
    };
    return next();
  };

  /* methods */
   create(path, arryOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arryOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  read(path, arryOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arryOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  update(path, arryOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arryOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  destroy(path, arryOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arryOfPolicies),
      this.applyCbs(callbacks)
    );
  }

  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }

  /* policies */
  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) return res.error400("No token provided");
      else {
        try {
          token = verifyToken(token);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role == 0) ||
            (policies.includes("ADMIN") && role == 1)
          ) {
            const user = await usersRepository.readByEmailRepository(email);
            req.user = user;
            return next();
          } else return res.send403();
        } catch (error) {
          return res.send401();
        }
      }
    }
  };
}

export default CustomRouter;
