import checkoutService from "../services/checkout.services.js";

const checkout = async (req, res, next) => {
  try {
    const { user_id } = req.session;
    /* revisar si era user_id la varibale */
    const response = await checkoutService({ user_id });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export default checkout;
