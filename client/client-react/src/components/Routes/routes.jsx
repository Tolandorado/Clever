import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Main } from "../Main/main";
import { Posts } from "../Posts/posts";
import { Registration } from "../Registration/registration";
import { CreateEvent } from "../CreateEvent/createEvent";
import { CreateProject } from "../CreateProject/createProject";
import { PostPage } from "../PostPage/postPage"

export const RoutesMain = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/post/post" element={<PostPage/>} />
        
      </Routes>
    </HashRouter>
  );
};


