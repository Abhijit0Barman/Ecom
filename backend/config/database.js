const mongoose = require("mongoose")

const connectDB = async () => {
  // try {
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true, // This option is used to enable the new URL parser in the MongoDB driver. The new URL parser is more flexible and less prone to errors compared to the older parser. It's recommended to set this option to true to ensure compatibility with the latest MongoDB driver

      useUnifiedTopology: true, //  This option is used to enable the new server discovery and monitoring engine in the MongoDB driver. The unified topology allows the driver to connect to multiple MongoDB servers and handle server changes more efficiently. It's recommended to set this option to true to ensure compatibility with the latest MongoDB driver
      // useCreateIndex: true //Starting from MongoDB version 4.2, the MongoDB driver automatically creates indexes on the specified fields in your models. Therefore, you don't need to explicitly enable the useCreateIndex option in your connection configuration.
    });
    console.log(`DB Connected with server HostName: ${connection.connection.host}`);
  // } 
  // catch (error) {
  //   console.error(error);
  // }
  
  // finally{
  //   console.log("DB Connected from finally")
  // }
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