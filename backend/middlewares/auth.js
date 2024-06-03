const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // console.log(req.user);
  req.user = await UserModel.findById(decoded.id);
// console.log(req.user);
  next();
});

exports.authRole = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this Resource`,
          403
        )
      );
    }

    next();
  };
};
