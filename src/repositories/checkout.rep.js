import CartsManagerMongo from "../data/mongo/CartsManager.js";
import Stripe from "stripe";
import CheckoutProduct from "../dto/checkout.dto.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);
const checkoutRepository = async (filter) => {
  try {
    
    let productsOnCart = await CartsManagerMongo.readFilter(filter);
    /* let productsOnCart = await CartsManagerMongo.read(); */
    console.log(filter);
    console.log(productsOnCart);
    

    productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = "http://localhost:8080/login"; /* cambiar */
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export { checkoutRepository };
