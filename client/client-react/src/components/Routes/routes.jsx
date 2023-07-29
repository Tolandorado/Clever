import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../Main/main';
import { Posts } from '../Posts/posts';
import { Registration } from '../Registration/registration';
import { Login } from '../Login/login';

export const RoutesMain = () => {
    return (
 
       <HashRouter>

        <Routes>
          <Route path='/logined' element={<Main />}></Route>
          <Route path='/posts' element={<Posts />}></Route>
          <Route path='/reg' element={<Registration />}></Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>

       </HashRouter>
 
    )
}