import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './component/App/App';
import Header from './component/Header/Header';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Mypage from './Pages/Mypage/Mypage';
import Post from './Pages/Post/Post';
import PostWrite from './Pages/PostWrite/PostWrite';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/mypage" element={<Mypage/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/postwrite" element={<PostWrite/>}/>
      <Route path="*" element={<App/>}/>
    </Routes>
  </BrowserRouter>
);