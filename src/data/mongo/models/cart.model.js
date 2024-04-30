import { Schema, model, Types } from "mongoose";

const collection = "carts";

const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: { type: String },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("user_id", "email");
});

const Cart = model(collection, schema);
export default Cart;
