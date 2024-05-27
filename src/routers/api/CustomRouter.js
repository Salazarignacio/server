import { Router } from "express";

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
    res.error400 = (error) => res.json({ statusCode: 400, error });
    res.error404 = (error) => res.json({ statusCode: 404, error });
    return next();
  };
  /* metodos */
  create(path, ...callbacks) {
    this.router.post(path, this.response, this.applyCbs(callbacks));
  }
  read(path, ...callbacks) {
    this.router.get(path, this.response, this.applyCbs(callbacks));
  }
  update(path, ...callbacks) {
    this.router.put(path, this.response, this.applyCbs(callbacks));
  }
  destroy(path, ...callbacks) {
    this.router.delete(path, this.response, this.applyCbs(callbacks));
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }

  /* policies */

  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) return res.send401();
      else {
        try {
          const { role, email } = jwt.verify(token, process.env.SECRET);
          if ((policies.includes("USER") && role === 0) || (policies.includes("ADMIN") && role === 1)) {
            const user = await users.readByEmail(email);
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
