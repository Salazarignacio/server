import { Router } from "express";

class CustomRouter {
  constructor() {
    this.Router();
    this.init();
  }
  getRouter() {
    this.router();
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
  /* metodos */
  create(path, ...callbacks) {
    this.router.post(path, this.applyCbs(callbacks));
  }
  read(path, ...callbacks) {
    this.router.get(path, this.applyCbs(callbacks));
  }
  update(path, ...callbacks) {
    this.router.put(path, this.applyCbs(callbacks));
  }
  destroy(path, ...callbacks) {
    this.router.delete(path, this.applyCbs(callbacks));
  }
  use(path, ...callbacks) {
    this.router.use(path, this.applyCbs(callbacks));
  }
}

export default CustomRouter;
