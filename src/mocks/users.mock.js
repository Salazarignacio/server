import dbConnect from "../utils/dbConect.util.js";
import environment from "../../utils/env.util.js";
import usersRepository from "../repositories/users.rep.js";
import { faker } from "@faker-js/faker";

async function createData() {
  dbConnect();
  try {
    const fn = faker.person.firstName().toLocaleLowerCase();
    const ln = faker.person.lastName().toLowerCase();
    const email = fn + ln + "gmail.com";
    const user = {
      email: email,
      password: 123,
      role: Math.floor(Math.random() * 2),
      age: 12,
      photo: faker.image.avatar(),
    };
    /* await usersRepository.createRepository(user); */
    console.log(environment.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
}

createData();
