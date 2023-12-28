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

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
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

module.exports = router;
