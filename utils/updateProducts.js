import "./env.util.js";
import dbConnect from "../src/utils/dbConect.util.js";
import productsRepository from "../src/repositories/products.rep.js"

async function updateProduct() {
  dbConnect();
  try {
    let data = await productsRepository.readRepository();

    for (let i = 0; i < data.length/2; i++) {
      await productsRepository.updateRepository(data[i]._id, { supplier_id: {"_id":"667b3772802ca3bea0430100"} });
    }

     for (let i = data.length-1; i > data.length/2; i--) {
      await productsRepository.updateRepository(data[i]._id, { supplier_id: {"_id":"66b5074b80880b63e6fae2f6"} });
    } 
  } catch (error) {
    throw error;
  }
}

updateProduct()
