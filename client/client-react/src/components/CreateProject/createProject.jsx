import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { ButtonToMain } from "../../Buttons/ButtonToMain/buttonToMain";
import styles from "./create-project.module.scss"

  export const CreateProject = () => {
    const [postName, setPostName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImg, setSelectedImg] = useState([]);
    const [selectedVector, setSelectedVector] = useState("");
    const {username, userId} = useContext(AuthContext);

  

  const handleEventNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImg(file)
    console.log("dasdd",selectedImg);
  };
  

  const handleVectorChange = (e) => {
    setSelectedVector(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const postingTime = currentTime.toLocaleDateString().slice(0);
    // const formData = new FormData();
    //     formData.append("image", selectedImg);
    //     console.log("содержимое изображения", formData.get("image"))
    
    

    // const requestData = {
    //   postName,
    //   postingTime,
    //   authorName: username,
    //   authorId: userId,
    //   selectedVector,
    //   typeOf: "projects",
    // formData,
    //   content: {
    //     description,
    //     // mediaContent: {
    //     //     selectedFile: formData,
    //     // }
    //   }
    // };   
    const content = {
      description: description,
    };
    const formData = new FormData();
formData.append("image", selectedImg);
formData.append("postName", postName);
formData.append("postingTime", postingTime);
formData.append("authorName", username);
formData.append("authorId", userId);
formData.append("selectedVector", selectedVector);
formData.append("typeOf", "projects");
formData.append('content', JSON.stringify(content));


    try {
      const response = await axios.post("http://192.168.1.132:5001/api/post/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Ответ с сервера", response.data);
      console.log("содержимое изображения", formData.get("image"))
      console.log("Создан проект:", formData);
      console.log("FormData", formData.get("image"));
      for (const entry of formData.entries()) {
        console.log(entry[0] + ':', entry[1]);
      }
    } catch(error) {
      console.error("Ошибка запроса", error);
    }
    
    


    setPostName("");
    setDescription("");
    // setSelectedImg(null);
    setSelectedVector("");
  };

  return (
    <div >
      <ButtonToMain/>
      <h1 className={styles.form_title}>Создание проекта</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Направление:
          <select className={styles.form_submit} value={selectedVector} onChange={handleVectorChange}>
            <option value="">Обязательно</option>
            <option value="Science">Science</option>
            <option value="Sport">Sport</option>
            <option value="Nature">Nature</option>
            <option value="Religion">Religion</option>
          </select>
        </label>
        <br />
        <label>
          Название публикации:
          <input
            className={styles.form_input}
            type="text"
            value={postName}
            onChange={handleEventNameChange}
          />
        </label>
        <br />
        <label className={styles.form_label}>
          Содержимое публикации:
          <br />
          <textarea
            className={styles.form_text}
            value={description}
            onChange={handleEventDescriptionChange}
          />
        </label>
        <br />
        <label className={styles.form_label}>
          Добавить изображение
          <input
            className={styles.form_input}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <button className={styles.form_submit} type="submit">Опубликовать</button>
      </form>
    </div>
  );
};

