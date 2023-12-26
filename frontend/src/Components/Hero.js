import React, { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [skillData, setSkillData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = skillData;

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const onChange = (e) =>
    setSkillData({ ...skillData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newSkill = { name, description };
    console.log("New Skill:", newSkill);
    try {
      const con = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(newSkill);
      const res = await axios.post("http://localhost:3000/skill", body, con);
      console.log(res);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleButtonClick}>
          {showForm ? "Close" : "Add Skill"}
        </button>
        {showForm && (
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <label>
                Skill Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Hero;
