const express = require("express");
const connectDB = require("./dbase/db");

const app = express();

connectDB();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => res.send("API Running"));
app.use("/skill", require("./routes/skill"));
app.use("/project", require("./routes/project"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Listening to ${PORT}`));
