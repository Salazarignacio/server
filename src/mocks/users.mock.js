import dbConnect from "../utils/dbConect.util.js";
import environment from "../../utils/env.util.js";
import usersRepository from "../repositories/users.rep.js";
import { faker } from "@faker-js/faker";
import { createHash } from "../../utils/hash.util.js";

async function createData() {
  dbConnect();
  try {
    const fn = faker.person.firstName().toLocaleLowerCase();
    const ln = faker.person.lastName().toLowerCase();
    const email = fn + ln + "@gmail.com";
    const user = {
      email: email,
      password: createHash("123"),
      role: Math.floor(Math.random() * 2),
      age: Math.floor(Math.random() * 100) + 1,
      photo: faker.image.avatar(),
    };
    await usersRepository.createRepository(user);
  } catch (error) {
    console.log(error);
  }
}

createData();

console.log("hola");
