import React from 'react';
import './Header.css';
import Community from '../../assets/image/Community.png';

function Header() {
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
  
  export default Header;