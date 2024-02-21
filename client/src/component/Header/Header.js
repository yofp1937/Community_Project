import React from 'react';
import './Header.css';
import Community from '../../assets/image/Community.png';

function Header() {
  function Logout() {
        localStorage.clear();
        window.location.href = '/';
  };
    return (
      <header>
        {localStorage.token ? (
          <div className="menu">
            <a href="/postwrite" className="a_postwrite">글쓰기</a>
            <a href="/mypage" className="mypage">{localStorage.nickname}</a>
            <a href="/" className="logout" onClick={Logout}>로그아웃</a>
          </div>
          ) : (
          <div className="menu">
            <a href="/login" className="login">로그인</a>
            <a href="/register" className="register">회원가입</a>
          </div>
          )}
        <hr/>
        <div className="logo">
            <a href="/"><img src={Community} alt="Community"/></a>
        </div>
        <hr/>
      </header>
    );
  }
  
  export default Header;