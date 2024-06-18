import args from "../../utils/args.utils.js"; /* dudo si esta bien importado */
import dbConnect from "../utils/dbConect.util.js";
import CartsManagerMongo from "./mongo/CartsManager.js";

const persistence = args.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );

    dao = { products: productsManagerMem, carts: "" };
    break;
  case "fs":
    console.log("connected to Fs");
    const { default: productsManagerFs } = await import(
      "./fs/ProductManager.js"
    );
    dao = { products: productsManagerFs };
    break;
  default:
    console.log("connected to mongo");
    dbConnect();
    const { default: ProductsManagerMongo } = await import(
      "./mongo/ProductsManager.js"
    );
    const { default: CartsManagerMongo } = await import(
      "./mongo/CartsManager.js"
    );
    dao = { products: ProductsManagerMongo, carts: CartsManagerMongo };
    break;
}

export default dao;
