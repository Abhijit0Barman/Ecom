const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to Database
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
