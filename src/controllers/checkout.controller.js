import { verifyToken } from "../../utils/token.utils.js";
import checkoutService from "../services/checkout.services.js";

const checkout = async (req, res, next) => {
  try {
    let user = req.cookies["token"];
    user = verifyToken(user);
    const {_id} = user
    const response = await checkoutService({ _id });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};


export { checkout };
