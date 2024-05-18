const express = require("express")

const app = express()

app.use(express.json())

// Route Import
const productRoute = require("./routes/productRoute")

// const homeRoute = require("./routes/home")
// const userRoute = require("./routes/user")
// const orderRoute = require("./routes/order")
// const uploadRoute = require("./routes/upload")

app.use("/api/v1", productRoute)

module.exports = app 