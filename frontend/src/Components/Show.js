import React, { useState, useEffect } from "react";
import axios from "axios";

const Show = () => {
  const [skill, setSkill] = useState([]);

  const getSkill = async () => {
    try {
      const response = await axios.get("http://localhost:3000/skill");
      setSkill(response.data);
    } catch (error) {
      console.error("Error fetching skill:", error);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      await axios.delete(`http://localhost:3000/skill/${skillId}`);
      setSkill((prev) => prev.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    getSkill();
  }, [skill]);

  return (
    <div>
      <h2>List of Skills</h2>
      <ul>
        {skill.map((skill, i) => (
          <li key={i}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            <button onClick={() => handleDelete(skill._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
