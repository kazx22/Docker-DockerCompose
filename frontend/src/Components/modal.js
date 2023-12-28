import React, { useState } from "react";
import axios from "axios";

const Modal = ({ skillId, currName, currDescription, onClose }) => {
  const [editedName, setEditedName] = useState(currName);
  const [editedDescription, setEditedDescription] = useState(currDescription);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/skill/${skillId}`, {
        name: editedName,
        description: editedDescription,
      });

      onClose();
    } catch (error) {
      console.error("Error updating skill:", error);
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
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          ></textarea>
          <button type="submit">Update Skill</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
