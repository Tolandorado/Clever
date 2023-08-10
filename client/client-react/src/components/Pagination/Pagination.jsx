import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './Pagination.module.css';
import {
    Link,
  } from "react-router-dom";

export const Pagination = () => {

    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true)
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


    return(
 

<div className={styles.container}>{pages.map(page => 
            <div className={styles.page} key={page.id}>
                 <img src={page.thumbnailUrl} alt="" />

                <div className='title'>{page.id}. {page.title}</div>
                   
            <Link key={page.id} to={`/post/${page.id}`}> <li>Подробнее...</li></Link>
                    
            </div>
            )}
        </div> 

     
    );
}