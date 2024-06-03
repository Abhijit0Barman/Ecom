const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const UserModel = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "this is a sample url",
    },
  });

  const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   token,
  // });
  sendToken(user, 201, res);
});

// Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // if email & password not provided
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = user.getJWTToken();

  // res.status(200).json({
  //   success: true,
  //   token,
  // });
  sendToken(user, 200, res);
});

// Logout a user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
