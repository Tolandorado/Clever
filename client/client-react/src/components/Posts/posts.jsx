import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export const Posts = () => {

    const [fetching, setFetching] = useState();
    useEffect(() => {
        const url = 'http://127.0.0.1:5000/';
        axios.get(url)
          .then(response => {
            // Обработка успешного ответа
            const data = response.data;
            console.log(response.data);
            setFetching([...data, ...response.data]);
          })
        
    }, [setFetching])
    return (
        <div className="main" >
            <h1>Posts</h1>
            {/* <h1>{fetching.name}</h1> */}
            <NavLink to='/'>Go to Main page</NavLink>
            
        </div>
    )
}