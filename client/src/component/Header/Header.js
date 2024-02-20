import React from 'react';
import './Header.css';
import Community from '../../assets/image/Community.png';
import axios from 'axios';

function Header() {

  function Logout() {
        localStorage.clear();
        window.location.href = '/';
  };

  if(localStorage.token) { // localStorage에 token이 존재하면 닉네임과 로그아웃 표시
    return (
      <header>
        <div className="menu">
            <a href="/mypage" className="mypage">{localStorage.nickname}</a>
            <a href="#" className="logout" onClick={Logout}>로그아웃</a>
        </div>
        
        <hr/>
        <div className="logo">
            <a href="/"><img src={Community} alt="Community"/></a>
        </div>
        <hr/>
      </header>
    );
  } else {
    return (
      <header>
        <div className="menu">
            <a href="/login" className="login">로그인</a>
            <a href="/register" className="register">회원가입</a>
        </div>
        
        <hr/>
        <div className="logo">
            <a href="/"><img src={Community} alt="Community"/></a>
        </div>
        <hr/>
      </header>
    );
  }
  }
  
  export default Header;