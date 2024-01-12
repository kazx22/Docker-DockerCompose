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

//  Getting all the projects from database to show in the frontend

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // getting all the projects
    res.json(projects); // converting to json
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

// !------------------------------ EJS -------------------------------------!

router.post("/add", async (req, res) => {
  const { name, techStack, description } = req.body; // destructing the object and assigning the body fields to relative variable

  try {
    let project = await Project.findOne({ name }); // Finding the name to check

    if (project) {
      return res.status(400).json({ msg: "Project already exists" }); // if found outputting messages
    }

    project = new Project({ name, techStack, description }); // if not present storing it the project as a new one

    await project.save(); // saving the project
    res.status(200).redirect("/"); // redirecting to index
  } catch (error) {
    console.error("Error adding project:", error);

    return res
      .status(500)
      .send("Error adding project. Check the server logs for details.");
  }
});

router.get("/add", (req, res) => {
  res.render("add"); // rendering to an add ejs
});

router.get("/edit/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); //  finding the project  by id
    res.render("edit", { project }); // rendering the edit ejs for the particular id project
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.post("/edit/:id", async (req, res) => {
  const { name, techStack, description } = req.body; // destructing the object and assigning the body fields to relative variable
  const projectId = req.params.id; // storing the id for project

  try {
    let project = await Project.findById(projectId); //  finding the project  by id
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // short circuiting to the projected fields if user not input the current field

    project.name = name || project.name;
    project.techStack = techStack || project.techStack;
    project.description = description || project.description;

    await project.save(); // saving the project to database

    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).send("Error updating project");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); // storing the project by id
    res.render("delete", { project }); // rendering the ejs delete
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id); // deleting the project by the id
    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }
    res.status(200).send("Project deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting project: " + error.message);
  }
});

module.exports = router;
