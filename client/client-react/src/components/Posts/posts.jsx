import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

export const Posts = () => {

    const [pages, setPages] = useState([])


    const url = 'http://localhost:5000/api/get-test';
 

useEffect(() => {
    if (pages.length === 0) {
      console.log('fetching')
      axios.get(url)
        .then(response => {
            setPages(prevPages => [prevPages, ...response.data])
            console.log(response)
        })
        .catch(error => {
          console.log('Error:', error)
        })
    }
  }, [])
  return (
    <div className="main">
      <h1>Posts</h1>
      <h1>{pages.name}</h1>
      <div>
        {pages.map(page => (
          <div key={page.id}>
            <h1>{page.name}</h1>
            <h1>{page.id}</h1>
          </div>
        ))}
      </div>
      <NavLink to='/'>Go to Main page</NavLink>
    </div>
  )
}