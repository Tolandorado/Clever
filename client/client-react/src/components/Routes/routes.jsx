import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Main } from "../Main/main";
import { Posts } from "../Posts/posts";
import { Registration } from "../Registration/registration";
import { Login } from "../Login/login";
import { PostCreate } from "../PostCreate/postCreate";
import { Pagination } from "../Pagination/Pagination";
import { CreateEvent } from "../CreateEvent/createEvent";
import { CreateProject } from "../CreateProject/createProject";

export const RoutesMain = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-project" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/postCreate" element={<PostCreate />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/create-project" element={<Pagination />} />
      </Routes>
    </HashRouter>
  );
};

export default RoutesMain;
