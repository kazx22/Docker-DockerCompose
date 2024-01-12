import React, { useState, useEffect } from "react";
import axios from "axios";
import ProModal from "./ProModal";

const ProShow = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    id: "",
    name: "",
    techStack: "",
    description: "",
  });

  const getProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project"); // using axios to get all the project from backend
      setProjects(response.data); // setting all the projects as an array on project state
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:3000/project/${projectId}`);
      setProjects((prev) =>
        prev.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleOpenModal = (project) => {
    setSelectedProject({
      id: project._id,
      name: project.name,
      techStack: project.techStack,
      description: project.description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    getProjects();
  };

  useEffect(() => {
    getProjects();
  }, [projects]);

  return (
    <div>
      <h2>List of Projects</h2>
      <ul>
        {projects.map((project, i) => (
          <li key={i}>
            <h3>{project.name}</h3>
            <h4>{project.techStack}</h4>
            <p>{project.description}</p>
            {/* <button onClick={() => handleDelete(project._id)}>Delete</button>
            <button onClick={() => handleOpenModal(project)}>Edit</button> */}
          </li>
        ))}
      </ul>
      {showModal && (
        <ProModal
          projectId={selectedProject.id}
          currName={selectedProject.name}
          currTechStack={selectedProject.techStack}
          currDescription={selectedProject.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProShow;
