import { verifyToken } from "../../utils/token.utils.js";
import productsRepository from "../repositories/products.rep.js";

async function isPremium(req, res, next) {
  try {
    /* necesito ID del user */
    let token = req.cookies["token"];
    token = verifyToken(token);
    const { _id } = token;
    const { pid } = req.params;
    const one = await productsRepository.readOneRepository(pid);
    if (one.supplier_id._id == _id) {
      return next();
    } else {
      throw new Error("You do not own this product.");
    }
  } catch (error) {
    next(error);
  }
}

export default isPremium
