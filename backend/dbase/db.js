const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://mongodb:27017/portfolio";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("Database Connected");
  } catch (err) {
    console.err(err);
  }
};

module.exports = connectDB;
