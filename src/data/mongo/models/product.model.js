import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
    },
    category: { type: String, default: "shoes" },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    supplier_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      
    },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("supplier_id", "_id email");
});

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
