import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../AuthContext";
import  { LoadingIcon } from "../../UI_units/LoadingIcon/loadingIcon";
import styles from "./posts.module.scss";
import API_URL from "../../api.config";


export const Posts = () => {
  const [pages, setPages] = useState([])
  const [fetching, setFetching] = useState(true)
 

 

  useEffect(() => {
      if (fetching) {
          console.log('fetching')
          axios.get(`${API_URL}:5000/api/post/list/all`) 
          .then(response => {
              setPages([...pages, ...response.data])
              console.log("респонс",response)
          })
          .finally( () => setFetching(false));
  }
}, [fetching])

  return(
<div className={styles.container}>
  {pages.map(page => 
    <div key={page.id}>
      <h1>{page.id}</h1>

    </div>
    )}
</div> 
  );
}