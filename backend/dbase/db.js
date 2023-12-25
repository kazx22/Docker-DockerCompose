const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://kazx:wcBE8f3K5TH5V8N2@portfolio.mu9i2wc.mongodb.net/?retryWrites=true&w=majority";

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
