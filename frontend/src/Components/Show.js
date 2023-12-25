import React, { useState, useEffect } from "react";
import axios from "axios";

const Show = () => {
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get("http://localhost:3000/skill");
        setSkill(response.data);
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    };

    fetchSkill();
  }, [skill]);

  return (
    <div>
      <h2>List of Skills</h2>
      <ul>
        {skill.map((skill, index) => (
          <li key={index}>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
