import __dirname from "../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Server API",
      description: "Documentation of Server API",
      lugar: `${__dirname}/src/docs/*.yaml`
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],
};

export default swaggerOptions;
