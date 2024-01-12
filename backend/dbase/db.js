const mongoose = require("mongoose");

// Mongo URI for the connection to monogo image presented in docker

const MONGODB_URI = "mongodb://mongodb:27017/portfolio";

// Authenticating connection with credentials but Showing authentication failed

// const MONGODB_URI =
//   "mongodb://admin:pass@database_c:27017/portfolio?authSource=myAuthDb";

// Connecting to mongodb

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
