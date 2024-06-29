import dbConnect from "../utils/dbConect.util.js";
import "../../utils/env.util.js";
import productsRepository from "../repositories/products.rep.js";
import { faker } from "@faker-js/faker";

async function createData() {
  dbConnect();
  const category = ["shoes", "shirts", "socks", "pants"];

  try {
    for (let i = 0; i < 1000; i++) {
      const product = {
        title: faker.commerce.product(),
        category: category[Math.floor(Math.random() * 4)],
        photo: faker.image.avatar(),
        price: Math.floor(Math.random() * 101),
        stock: Math.floor(Math.random() * 100001),
      };
      await productsRepository.createRepository(product);
    }
  } catch (error) {
    console.log(error);
  }
}

createData();
