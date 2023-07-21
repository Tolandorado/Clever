import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../Main/main';
import { Posts } from '../Posts/posts';
import { LoginForm } from '../Login/login';

export const RoutesMain = () => {
    return (
 
       <HashRouter>

|       <Routes>
          <Route path='/login' element={<Main />}></Route>
          <Route path='/posts' element={<Posts />}></Route>
          <Route path='/' element={<LoginForm />}></Route>
        </Routes>

       </HashRouter>
 
    )
}