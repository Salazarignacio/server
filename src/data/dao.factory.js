import argsUtils from "../../utils/args.utils.js";
import dbConnect from "../utils/dbConect.util.js";

const persistence = argsUtils.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    break;
  case "fs":
    console.log("connected to Fs");
    break;
  default:
    console.log("connected to mongo");
    break;
}

export default dao;
