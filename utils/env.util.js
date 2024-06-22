import { config } from "dotenv";
import argsUtils from "./args.utils.js";

const { env } = argsUtils;
const path = env == "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const environment = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,

  SECRET_SESSION: process.env.SECRET_SESSION,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  SECRET_JWT: process.env.SECRET_JWT,

  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
};

export default environment;
