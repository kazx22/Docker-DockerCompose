import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
const Show = () => {
  const [skill, setSkill] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState({
    id: "",
    name: "",
    description: "",
  });

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

  const handleOpenModal = (skill) => {
    setSelectedSkill({
      id: skill._id,
      name: skill.name,
      description: skill.description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    getSkill();
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
            {/* <button onClick={() => handleDelete(skill._id)}>Delete</button>
            <button onClick={() => handleOpenModal(skill)}>Edit</button> */}
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal
          skillId={selectedSkill.id}
          currentName={selectedSkill.name}
          currentDescription={selectedSkill.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Show;
