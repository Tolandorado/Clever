import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { PostCreate } from "../PostCreate/postCreate";
import styles from "./posts.module.scss";
import { Link } from "react-router-dom";

export const Posts = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const [pages, setPages] = useState([]);

  // const url = "http://localhost:5000/api/get-test";

  // useEffect(() => {
  //   if (pages.length === 0) {
  //     console.log("fetching");
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         setPages((prevPages) => [prevPages, ...response.data]);
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log("Error:", error);
  //       });
  //   }
  // }, []);
  // return (
  //   <div className="main">
  //     <h1>Posts</h1>
  //     <h1>{pages.name}</h1>
  //     <div>
  //       {pages.map((page) => (
  //         <div key={page.id}>
  //           <h1>{page.name}</h1>
  //           <h1>{page.id}</h1>
  //         </div>
  //       ))}
  //     </div>
  //     <NavLink to="/logined">Go to Main page</NavLink>
  //   </div>
  // );

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      console.log("fetching");
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=40&_page=${currentPage}`
        )
        .then((response) => {
          setPages([...pages, ...response.data]);
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(response.headers["x-total-count"]);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [totalCount]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      pages.length < totalCount
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="main">
      <h1>Posts</h1>
      <div className={styles.postContainer}>
        {pages.map((page) => (
          <div key={page.id} className={styles.postCard}>
            <img
              src={page.thumbnailUrl}
              alt={page.title}
              className={styles.postImage}
            />
            <div className={styles.postContent}>
              <h2 className={styles.postTitle}>{page.title}</h2>
              <p className={styles.postDate}>
                {new Date(page.date).toLocaleDateString()}
              </p>
              <p className={styles.postAuthor}>By {page.author}</p>
            </div>
          </div>
        ))}
      </div>
      <NavLink to="/logined">Go to Main page</NavLink>
    </div>
  );
};
