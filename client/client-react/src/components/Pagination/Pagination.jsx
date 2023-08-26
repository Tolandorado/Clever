import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { Link } from "react-router-dom";

export const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (fetching) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setPosts(response.data);
          setFetching(false);
        })
        .catch((error) => {
          console.log("Error fetching posts:", error);
          setFetching(false);
        });
    }
  }, [fetching]);

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
