import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { ButtonToMain } from "../ButtonToMain/buttonToMain";

  export const CreateProject = () => {
    const [postName, setPostName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedVector, setSelectedVector] = useState("");
    const {username, userId} = useContext(AuthContext);

  

  const handleEventNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleVectorChange = (e) => {
    setSelectedVector(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const postingTime = currentTime.toLocaleDateString().slice(0);
    const requestData = {
      postName,
      postingTime,
      authorName: username,
      authorId: userId,
      selectedVector,
      typeOf: "project",
      content: {
        description,
        mediaContent: {
          selectedFile,
        }
      }
    };   

    try {
      const response = await axios.post("/api", requestData);
      console.log("Ответ с сервера", response);
    } catch(error) {
      console.error("Ошибка запроса", error);
    }
    
    console.log("Создан проект:", requestData);

    setPostName("");
    setDescription("");
    setSelectedFile(null);
    setSelectedVector("");
  };

  return (
    <div>
      <ButtonToMain/>
      <h1>Создание проекта</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Vector:
          <select value={selectedVector} onChange={handleVectorChange}>
            <option value="">Выбрать вектор</option>
            <option value="Science">Science</option>
            <option value="Sport">Sport</option>
            <option value="Nature">Nature</option>
            <option value="Religion">Religion</option>
          </select>
        </label>
        <br />
        <label>
          Event Name:
          <input
            type="text"
            value={postName}
            onChange={handleEventNameChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <textarea
            value={description}
            onChange={handleEventDescriptionChange}
          />
        </label>
        <br />
        <label>
          Добавить изображение
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <button type="submit">Опубликовать</button>
      </form>
    </div>
  );
};

