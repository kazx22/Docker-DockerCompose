const express = require("express");
const connectDB = require("./dbase/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const Project = require("./model/project");
const Skill = require("./model/skills");

const app = express();

connectDB();

app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(express.json()); // Parsing incoming JSON requests
app.set("view engine", "ejs"); // Setting the view engine to EJS

// Parsing incoming URL-encoded data with extended options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    // Fetching projects and skills from the database
    const projects = await Project.find();
    const skills = await Skill.find();
    res.render("index", { projects, skills });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

app.use("/skill", require("./routes/skill")); // defining custom routes for skill
app.use("/project", require("./routes/project")); // defining custom routes for projects

const PORT = process.env.PORT || 3000; // assigning a port with Environment variable or a default 3000
app.listen(PORT, () => console.log(`Server is Listening to ${PORT}`)); //listening to specified port
