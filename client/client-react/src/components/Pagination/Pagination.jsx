import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";
import { Link } from "react-router-dom";

export const Pagination = () => {
    const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);



//   useEffect(() => {
//     if (fetching) {
//         console.log('fetching', fetching)
//         axios.get(`http://192.168.1.132:5001/api/post/list/random/3/${currentPage}`) 
//         .then(response => {
//           const data = response.data
//             setPages([...pages, ...response.data])
//             setCurrentPage(prevState => prevState + 1) 
//             setTotalCount(response.headers['X-Total-Count']) 
//             setIsLoading(false);
//             console.log('fetching', response.data)
//             console.log("счетчик",totalCount)


//         })
//         .finally( () => setFetching(false));
// }
// }, [fetching])

// useEffect(()=> {
//     document.addEventListener('scroll', scrollHandler)
//     return function() {
//         document.removeEventListener('scroll', scrollHandler)
//     };

// }, [totalCount])

// const scrollHandler = (e) => {
//     if (e.target.documentElement.scrollHeight - ( e.target.documentElement.scrollTop + window.innerHeight) < 100 
//     && pages.length < totalCount) {
//         setFetching(true)
//         console.log('scroll')
//     }    
    
// }
//   if (isLoading) {
//     return (
//       <div className={styles.container}>
//       <LoadingIcon/>
//     </div>
//     )};
  
//   if (isLoggedIn === false) {
//     return (
//       <div>
//         <h1>post</h1>
//         <NavLink to="/logined">Пройдите авторизацию.</NavLink>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
 
//       {pages.map(page => 
//           <div className={styles.page} key={page.id}>
//              <div>{page.authorName}</div>  
//           </div>           
//             )}
//     </div>
//   );

 
};
