require("dotenv").config();

// Create Token & saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("jwt", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;