import express from "express";
import iProducts from "./data/fs/ProductManager.js";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

/* middlewares */
server.use(express.urlencoded({ extended: true }));

/* routes */

server.get("/", (req, res) => {
  try {
    return res.status(200).json({ respose: "HOME", succes: true });
  } catch (err) {
    return res.status(500).json({ succes: false });
  }
});

/* RUTA QUE LEE TODOS LOS PRODUCTOS */

server.get("/api/products", async (req, res) => {
  try {
    const read = await iProducts.read();
    if (read) {
      return res.status(200).json({
        response: read,
        succes: true,
      });
    } else {
      const error = new Error("Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      statusCode: 404,
      response: null,
      message: error.message,
    });
  }
});

/* RUTA QUE TOMA EL PARAMETRO PID PARA LEER UN PRODUCTO ESPECIFICO */
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const readOne = await iProducts.readOne(pid);
    if (readOne) {
      return res.status(200).json({
        response: readOne,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      statusCode: 404,
      response: null,
      message: error.message,
    });
  }
});
