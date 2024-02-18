import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  }

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

      if(response.data){
        goToMain();
      } 

    } catch (error) {
      alert("에러 발생");
    }

  };

  return (
    <div className={styles.login}>
        <input type="text" className={styles.input_id} placeholder="아이디를 입력해주세요" onChange={(e) => setId(e.target.value)}/><br/>
        <input type="password" className={styles.input_pwd} placeholder="비밀번호를 입력해주세요" onChange={(e) => setPassword(e.target.value)}/><br/>
        <button type="submit" className={styles.submit} onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;