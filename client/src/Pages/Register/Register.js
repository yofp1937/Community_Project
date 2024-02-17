import React, { useState } from 'react';
import styles from './Register.module.css';
import axios from 'axios';

function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  
  const handleRegister= async () => {
    try {
      const response = await axios.post('/api/register', {
        id: id,
        password: password,
        nickname: nickname,
      });
      //console.log(response.data);
    } catch (error) {
      console.error("회원가입 에러 - ", error);
    }
  };

  return (
      <div className={styles.register}>
          <div className={styles.id}>
            <input type="text" placeholder="아이디를 입력해주세요(최소 4글자)"className={styles.input_id} onChange={(e) => setId(e.target.value)}/>
            <button type="button" className={styles.btn_check}>중복체크</button>
          </div>

          <div className={styles.pwd}>
            <input type="password" placeholder="비밀번호를 입력해주세요" className={styles.input_pwd1} onChange={(e) => setPassword(e.target.value)}/><br/>
            <input type="password" placeholder="비밀번호를 재입력해주세요" className={styles.input_pwd2}/>
            <span className={styles.span_pwd}></span>
          </div>

          <div className="nickname">
            <input type="text" placeholder="닉네임을 입력해주세요(2~12글자)" className={styles.input_nick} onChange={(e) => setNickname(e.target.value)}/>
            <span className={styles.span_nick}></span>
          </div>
          
          <button type="button" className={styles.btn_register} onClick={handleRegister}>회원가입</button>
      </div>
  );
}

export default Register;