import React from 'react';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.login}>
        <input type="text" className={styles.input_id} placeholder="아이디를 입력해주세요"/><br/>
        <input type="password" className={styles.input_pwd} placeholder="비밀번호를 입력해주세요"/><br/>
        <button type="submit" className={styles.submit}>로그인</button>
    </div>
  );
}

export default Login;