import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { Link } from "react-router-dom";

export const Pagination = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (fetching) {
        console.log('fetching')
        axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=40&_page=${currentPage}`) 
        .then(response => {
            setPages([...pages, ...response.data])
            setCurrentPage(prevState => prevState + 1) 
            setTotalCount(response.headers['x-total-count']) 
        })
        .finally( () => setFetching(false));
}
}, [fetching])

useEffect(()=> {
    document.addEventListener('scroll', scrollHandler)
    return function() {
        document.removeEventListener('scroll', scrollHandler)
    };

}, [totalCount])

const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - ( e.target.documentElement.scrollTop + window.innerHeight) < 100 
    && pages.length < totalCount) {
        setFetching(true)
    }    
}

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.page} key={post.id}>
          <div className="title">
            {post.id}. {post.title}
          </div>
          <Link to={`/post/${post.id}`}>Подробнее...</Link>
        </div>
      ))}
    </div>
  );
};
