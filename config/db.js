const mongodb = require("mongoose");

const dbConnection = async () => {
  try {
    await mongodb.connect("mongodb://127.0.0.1:27017/imageProcessingDB");
    console.log("Db connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
