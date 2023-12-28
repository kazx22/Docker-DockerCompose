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

router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }
    res.status(200).send("Project deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting project: " + error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { name, techStack, description } = req.body;
  const projectId = req.params.id;

  try {
    let project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.name = name || project.name;
    project.techStack = techStack || project.techStack;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({ msg: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Error updating project");
  }
});

module.exports = router;
