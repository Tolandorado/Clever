import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../AuthContext";
import  { LoadingIcon } from "../../UI_units/LoadingIcon/loadingIcon";
import styles from "./posts.module.scss";
import API_URL from "../../api.config";


export const Posts = () => {
  const [pages, setPages] = useState([])
  const [fetching, setFetching] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedType, setSelectedType] = useState("all");
  const [selectedVector, setSelectedVector] = useState("all");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    console.log(selectedType)
  };
 
  // Обработчик изменения выбранного вектора
  const handleVectorChange = (e) => {
    setSelectedVector(e.target.value);
    console.log(selectedVector)
  };

  useEffect(() => {
      if (fetching) {
          console.log('fetching')
          axios.get(`${API_URL}:5000/api/post/list/all`) 
          .then(response => {
              setIsLoaded(true);
              setPages([...pages, ...response.data]);
              console.log("респонс",response.data);
          })
          .finally( () => setFetching(false));
  }
}, [fetching])

const filteredPages = pages.filter((item) => {
 
  switch (selectedType) {
        case "all":
          return true;
        case "projects":
          return item.type === "projects";
        case "activities":
          return item.type === "activities";
        default:
          return false;
      }
});

const filteredAllPages = filteredPages.filter((item) => {
  switch (selectedVector) {
        case "all":
          return true;
        case "Sport":
          return item.vector === "Sport";
        case "Science":
          return item.vector === "Science";
        case "Nature":
          return item.vector === "Nature";
        case "Religion":
          return item.vector === "Religion";
        default:
          return false;
      }
});

console.log('первое',filteredPages)
console.log('да',filteredAllPages)

if (isLoaded === false) {
  <LoadingIcon/>
}

  return(
<div className={styles.wrapper}>
  <div className={styles.filter}>
   
     {/* Фильтр по типу */}
     <label>
          Тип
          <select className={styles.filter_submit} value={selectedType} onChange={handleTypeChange}>
            <option value="all">Все</option>
            <option value="projects">Проект</option>
            <option value="activities">Мероприятие</option>
          </select>
        </label>

        <label>
          Направление
          <select className={styles.filter_submit} value={selectedVector} onChange={handleVectorChange}>
            <option value="all">Все</option>
            <option value="Sport">Спорт</option>
            <option value="Science">Наука</option>
            <option value="Nature">IT</option>
            <option value="Religion">Религия</option>
          </select>
        </label>

  </div>
  <div className={styles.container}>
  {filteredAllPages.map(page => 
    <NavLink to={`/post/${page.id}`} key={page.id}>
      <div key={page.id} className={styles.page}>     
      <div className={styles.page_container}>

      <img src={page.imageURL} alt="photo" className={styles.page_image}/>
      <p className={styles.page_name}>{page.postName}</p>
  
      <p className={styles[`page_author-name`]}>Автор: {page.authorName}</p>
      <p className={styles[`page_posting-time`]}>Дата публикации: {page.postingTime}</p>
      

      </div>
    </div>
    </NavLink>
    )}
  </div>
</div> 
  );
}