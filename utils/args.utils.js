import { Command } from "commander";

const args = new Command();

args
  .option("-d", "debug", false)
  .option("-p <port>", "port")
  .option("--mode <mode>", "enviroment", "production")
  .option("-u <user>", "user", "no user");

args.parse();

export default args.opts();
