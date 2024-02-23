import React from 'react';
import styles from './Header.module.css';
import Community from '../../assets/image/Community.png';

function Header() {
  function Logout() {
        localStorage.clear();
        window.location.href = '/';
  };
    return (
      <header>
        {localStorage.token ? (
          <div className={styles.menu}>
            <a href="/postwrite" className={styles.a_postwrite}>글쓰기</a>
            <a href="/mypage" className={styles.mypage}>{localStorage.nickname}</a>
            <a href="/" className={styles.logout} onClick={Logout}>로그아웃</a>
          </div>
          ) : (
          <div className={styles.menu}>
            <a href="/login" className={styles.login}>로그인</a>
            <a href="/register" className={styles.register}>회원가입</a>
          </div>
          )}
        <hr/>
        <div className={styles.logo}>
            <a href="/"><img src={Community} alt="Community"/></a>
        </div>
        <hr/>
      </header>
    );
  }
  
  export default Header;