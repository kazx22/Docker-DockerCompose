import React, { useState } from "react";
import axios from "axios";

const ProModal = ({
  projectId,
  currName,
  currTechStack,
  currDescription,
  onClose,
}) => {
  const [editedName, setEditedName] = useState(currName);
  const [editedTechStack, setEditedTechStack] = useState(currTechStack);
  const [editedDescription, setEditedDescription] = useState(currDescription);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/project/${projectId}`, {
        name: editedName,
        techStack: editedTechStack,
        description: editedDescription,
      });

      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedTechStack}
            onChange={(e) => setEditedTechStack(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
          <button type="submit">Update Project</button>
        </form>
      </div>
    </div>
  );
};

export default ProModal;
