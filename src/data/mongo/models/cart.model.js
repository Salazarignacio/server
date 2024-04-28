import { Schema, model } from "mongoose";


const collection = "carts";

const schema = new Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    state: { type: String },
  },
  { timestamps: true }
);

const Cart = model(collection, schema);
export default Cart;
