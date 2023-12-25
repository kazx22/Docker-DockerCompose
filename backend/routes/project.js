const express = require("express");
const router = express.Router();
const Project = require("./../model/project");

router.post("/", async (req, res) => {
  const { name, techStack, description } = req.body;

  try {
    let project = await Project.findOne({ name });

    if (project) {
      return res.status(400).json({ msg: "Project already exists" });
    }

    project = new Project({ name, techStack, description });

    await project.save();

    res.status(201).json({ msg: "Project Saved", project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;
