const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());

// Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
