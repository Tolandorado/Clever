import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { PostCreate } from "../PostCreate/postCreate";
import styles from "./posts.module.scss";

export const Posts = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
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

  const url = "https://jsonplaceholder.typicode.com/photos";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log("ответ", response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  
  
  if (isLoggedIn === false) {
    return (
      <div>
        <h1>post</h1>
        <NavLink to="/logined">Пройдите авторизацию.</NavLink>
      </div>
    );
  }

  return (
    <div>
      <h1>post</h1>
      
      <PostCreate/>

    </div>
  );
};
