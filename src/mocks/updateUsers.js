import usersRepository from "../repositories/users.rep.js";
import "../../utils/env.util.js";
import dbConnect from "../utils/dbConect.util.js";

async function updateData() {
  dbConnect();
  try {
    let data = await usersRepository.readRepository();

    for (let i = 0; i < data.length; i++) {
      await usersRepository.updateRepository(data[i]._id, { verify: true });
    }
  } catch (error) {
    throw error;
  }
}

updateData();
