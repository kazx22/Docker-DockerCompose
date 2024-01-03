const express = require("express");
const connectDB = require("./dbase/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));
app.use("/skill", require("./routes/skill"));
app.use("/project", require("./routes/project"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Listening to ${PORT}`));
