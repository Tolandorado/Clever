import React, { useState } from "react";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавьте код для обработки создания проекта
    console.log("Создан проект:", projectName, projectDescription);
    // Сбросить значения полей после отправки
    setProjectName("");
    setProjectDescription("");
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
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export { CreateProject };
