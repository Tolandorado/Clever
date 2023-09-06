import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../AuthContext";
import  { LoadingIcon } from "../../UI_units/LoadingIcon/loadingIcon";
import styles from "./posts.module.scss";

export const Posts = () => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true); // Изначально устанавливаем значение в false
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      axios
        .get(`http://192.168.1.132:5001/api/post/list/random/1/${currentPage}`,{
          params: {
            cache: 'no-cache',
          },
        })
        .then((response) => {
          const data = response.data;
          setPages((prevPages) => [...prevPages, ...data]);
          setCurrentPage((prevPage) => prevPage + 1);
          setTotalCount(response.headers["X-Total-Count"]);
          console.log(response)
         
        })
        .finally(() => setFetching(false));
    }
  }, [fetching, currentPage]);

  useEffect(() => {
     console.log(totalCount)
  })
  useEffect(() => {
    const scrollHandler = () => {
      if (
        // Проверяем, что прокрутка достигла нижней границы страницы с допустимым отступом в 100 пикселей
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        pages.length < totalCount
      ) {
        setFetching(true);
      }
    };

    // Добавляем обработчик прокрутки при монтировании компонента
    document.addEventListener("scroll", scrollHandler);

    // Удаляем обработчик прокрутки при размонтировании компонента
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [pages, totalCount]);

  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>{page.authorName}</div>
      ))}
    </div>
  );
};