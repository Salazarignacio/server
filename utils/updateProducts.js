import "./env.util.js";
import dbConnect from "../src/utils/dbConect.util.js";
import productsRepository from "../src/repositories/products.rep.js"

async function updateProduct() {
  dbConnect();
  try {
    let data = await productsRepository.readRepository();

    for (let i = 0; i < data.length; i++) {
      await productsRepository.updateRepository(data[i]._id, { supplier_id: {"_id":"66b5074b80880b63e6fae2f6"} });
    }
  } catch (error) {
    throw error;
  }
}



updateProduct()
