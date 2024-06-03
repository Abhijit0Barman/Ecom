const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Id Error In MongoDB
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value} Invalid: ${err.path}`;
    err = new ErrorHandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // statusCode: err.statusCode,
    // error: err.stack,
  });
};

/*
module.exports=(err,req,res,next)=>{
  console.log(err)
  const error=new ErrorHandler(err.message,err.statusCode)
  res.status(error.statusCode).json({
    success:false,
    error:error.message
  })
}
*/
