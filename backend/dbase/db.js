const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://mongodb:27017/portfolio";

// const MONGODB_URI =
//   "mongodb://admin:pass@database_c:27017/portfolio?authSource=myAuthDb";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
