import React, { useState, useEffect } from "react";
import { NavLink,
useParams, } from "react-router-dom";
import axios from "axios";
import styles from './post-page.module.scss';
import API_URL from "../../api.config";

export const PostPage = () => {

  const [page, setPage] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async ()  => {
      axios.get(`${API_URL}:5000/api/post/get/${id}`)
      .then(res => {
        setPage(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err));
    }
    fetchData()
  }, [id]); 

  return (
    <>   
    <div className={styles.container} >
      {page && (
        <div className={styles.content}>
            <h1 className={styles.title}>{page.postName}</h1>
            <div  className={styles[`page-meta`]}>
                <p className={styles[`author-name`]}>Опубликовал: {page.authorName}</p>
                <p className={styles[`posting-time`]}>Дата публикации: {page.postingTime}</p>
            </div>
           <div className={styles[`image-container`]}>
           <img src={page.imageURL} alt="photo"  className={styles.image}/>
           </div>
   
            <div className={styles.link}>
            <NavLink to="/" className={styles.text}>Назад к списку постов</NavLink>
            </div>
        </div>
      )}     
    </div>   
    </>
  )
}