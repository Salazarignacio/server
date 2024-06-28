import dbConnect from "../utils/dbConect.util.js";
import environment from "../../utils/env.util.js";
import productsRepository from "../repositories/products.rep.js";
import { faker } from "@faker-js/faker";

async function createData() {
  dbConnect();
  try {
    const product = {
      title: faker.commerce.product(),
      
      
    };
    await productsRepository.createRepository(product);
    console.log('done');
  } catch (error) {
    console.log(error);
  }
}

createData();
