function errorHandler(error, req, res, next) {
    console.log(error);
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "API ERROR",
    });
  }
  
  export default errorHandler;