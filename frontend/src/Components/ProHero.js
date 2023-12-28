import React, { useState } from "react";
import axios from "axios";

const ProHero = () => {
  const [showForm, setShowForm] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    techStack: "",
    description: "",
  });

  const { name, techStack, description } = projectData;

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const onChange = (e) =>
    setProjectData({ ...projectData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newProject = { name, techStack, description };
    console.log("New Project:", newProject);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const body = JSON.stringify(newProject);
      const res = await axios.post(
        "http://localhost:3000/project",
        body,
        config
      );
      console.log(res);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleButtonClick}>
          {showForm ? "Close" : "Add Project"}
        </button>
        {showForm && (
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <label>
                Project Name:
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
                Tech Stack:
                <input
                  type="text"
                  name="techStack"
                  value={techStack}
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

export default ProHero;
