import { Command } from "commander";

const args = new Command();

args
  .option("-d", "debug", false)
  .option("-p <port>", "port")
  .option("--env <env>", "environment", "prod")
  .option("--persistence <pers>", "persistence", "mongo");

args.parse();

export default args.opts();
