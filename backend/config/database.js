const mongoose = require("mongoose")
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    });
    console.log(`DB Connected with server HostName: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

/*
const connectDB = () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
    .then((data) => {
      console.log(`DB Connected with server: ${data.connection.host}`)
    })
    .catch((err) => {
      console.log(err);
    })
}
*/

module.exports = connectDB;