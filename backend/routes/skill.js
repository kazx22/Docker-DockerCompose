const express = require("express");
const router = express.Router();
const Skill = require("./../model/skills");

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    let skill = await Skill.findOne({ name });

    if (skill) {
      return res.status(400).json({ msg: "Skill already exists" });
    }

    skill = new Skill({ name, description });

    await skill.save();

    res.status(201).json({ msg: "Skill Saved", skill });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

//  Getting all the skills from database to show in the frontend

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find(); // getting all the skills
    res.json(skills); // converting to json
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).send("Skill not found");
    }
    res.status(200).send("Skill deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting skill: " + error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  const skillId = req.params.id;

  try {
    let skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }

    skill.name = name || skill.name;
    skill.description = description || skill.description;

    await skill.save();

    res.status(200).json({ msg: "Skill updated successfully", skill });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).send("Error updating skill");
  }
});

//!-------------------------------- EJS --------------------------------------!

router.post("/add", async (req, res) => {
  const { name, description } = req.body; // destructing the object and assigning the body fields to relative variable

  try {
    let skill = await Skill.findOne({ name }); // Finding if the name to check

    if (skill) {
      return res.status(400).json({ msg: "skill already exists" }); // if found outputting messages
    }

    skill = new Skill({ name, description }); // if not present storing it the project as a new one

    await skill.save(); // saving the project
    res.status(200).redirect("/"); // redirecting to index
  } catch (error) {
    console.error("Error adding skill:", error);

    return res
      .status(500)
      .send("Error adding project. Check the server logs for details.");
  }
});

router.get("/add", (req, res) => {
  res.render("sadd"); // rendering to an sadd ejs
});

router.get("/edit/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id); //  finding the project  by id
    res.render("sedit", { skill }); // rendering the edit ejs for the particular id project
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.post("/edit/:id", async (req, res) => {
  const { name, description } = req.body; // destructing the object and assigning the body fields to relative variable
  const skillId = req.params.id; // storing the id for project

  try {
    let skill = await Skill.findById(skillId); //  finding the project  by id
    if (!skill) {
      return res.status(404).json({ msg: "Skill not found" });
    }
    // short circuiting to the projected fields if user not input the current field
    skill.name = name || skill.name;
    skill.description = description || skill.description;

    await skill.save(); // saving the project to database

    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error updating Skill:", error);
    res.status(500).send("Error updating Skill");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id); // storing the project by id
    res.render("sdelete", { skill }); // rendering the ejs sdelete
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Something Went Wrong");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id); // storing the project by id
    if (!deletedSkill) {
      return res.status(404).send("Skill not found");
    }
    res.status(200).send("Skill deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting Skill: " + error.message);
  }
});

module.exports = router;
