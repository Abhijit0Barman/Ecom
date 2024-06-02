const express = require("express");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());

// Route Import
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
