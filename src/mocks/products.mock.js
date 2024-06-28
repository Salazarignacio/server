import dbConnect from "../utils/dbConect.util.js";
import environment from "../../utils/env.util.js";
import productsRepository from "../repositories/products.rep.js";
import { faker } from "@faker-js/faker";

async function createData() {
  dbConnect();
  try {
    const product = {
      title: faker.commerce.product(),
      price: Math.floor(Math.random() * 101),
      stock: 13
    };
    /* await productsRepository.createRepository(product); */
    console.log(environment.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}

createData();
