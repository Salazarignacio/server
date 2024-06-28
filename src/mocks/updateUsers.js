import usersRepository from "../repositories/users.rep.js";
import environment from "../../utils/env.util.js";
import dbConnect from "../utils/dbConect.util.js";

async function updateData() {
  dbConnect();
  try {
    let data = await usersRepository.readRepository();
    
    
    for (let i = 0; i<data.length; i++){
    const uu =  await usersRepository.updateRepository(data[i]._id, { age: 31 });
}
    console.log(data);
  } catch (error) {
    throw error
  }
}

updateData();
