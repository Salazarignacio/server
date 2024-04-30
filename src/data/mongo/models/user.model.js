import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    age: { type: Number, default: 12 },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;