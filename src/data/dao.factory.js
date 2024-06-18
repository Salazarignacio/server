import args from "../../utils/args.utils.js"; /* dudo si esta bien importado */
import dbConnect from "../utils/dbConect.util.js";


const persistence = args.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    dao = { products: productsManagerMem };
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
    dao = { products: ProductsManagerMongo };
    break;
}

export default dao;
