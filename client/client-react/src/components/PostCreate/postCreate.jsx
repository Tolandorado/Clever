import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

export const PostCreate = () => {
  const { username } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const post = {
      title: title,
      body: body,
      username: username,
      image: image,
    };

    console.log(post);

    // отправка формы на сервер
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Заголовок:</label>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label>Содержимое:</label>
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
      ></textarea>

      <label>Изображение:</label>
      <input type="file" onChange={handleImageChange} />

      <button type="submit">Создать пост</button>
    </form>
  );
};
