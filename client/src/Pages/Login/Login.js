import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  
  // 로그인 버튼 누르면 작동
  const handleLogin = async () => {
    // 아이디, 패스워드 입력 안돼있으면 return
    if(id===""){
      alert("아이디를 입력해주세요.");
      return;
    }
    if(password===""){
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 조건 만족하면 서버로 로그인 요청
    try {
      const response = await axios.post('/api/login', {
        id: id,
        password: password,
      });

      if(response.status === 200){ // 입력받은 id, pwd 일치하면 localStorage에 id, nickname, token 값 생성해서 로그인상태 유지, 메인으로 이동
        localStorage.clear();
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('nickname', response.data.nickname);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }

    } catch (error) {
      if (error.response.data) {
        alert("에러: " + error.response.data);
      } else {
        alert("에러 발생");
      }
    }

  };

  return (
    <div className={styles.login}>
        <input type="text" className={styles.input_id} placeholder="아이디를 입력해주세요" onChange={(e) => setId(e.target.value)}/><br/>
        <input type="password" className={styles.input_pwd} placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)}/><br/>
        <button type="button" className={styles.btn_submit} onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;