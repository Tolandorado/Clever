import React, { useState } from "react";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVector, setSelectedVector] = useState("");

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleVectorChange = (e) => {
    setSelectedVector(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      projectName,
      projectDescription,
      selectedFile,
      selectedVector,
    };

    console.log("Создан проект:", projectData);

    setProjectName("");
    setProjectDescription("");
    setSelectedFile(null);
    setSelectedVector("");
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </label>
        <br />
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          />
        </label>
        <br />
        <label>
          Add File:
          <input
            type="file"
            accept="image/*, video/*, .zip, .rar"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <label>
          Vector:
          <select value={selectedVector} onChange={handleVectorChange}>
            <option value="">Select Vector</option>
            <option value="Up">Math</option>
            <option value="Down">Programming</option>
            <option value="Left">Physics</option>
            <option value="Right">Biology</option>
          </select>
        </label>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export { CreateProject };
