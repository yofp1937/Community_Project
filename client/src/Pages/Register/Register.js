import React from 'react';
import styles from './Register.module.css';

function Register() {
  return (
      <div className={styles.register}>
          <div className={styles.id}>
            <input type="text" placeholder="아이디를 입력해주세요" className={styles.input_id}/><button type="button" className={styles.btn_check}>중복체크</button>
          </div>

          <div className={styles.pwd}>
            <input type="password" placeholder="비밀번호를 입력해주세요" className={styles.input_pwd1}/><br/>
            <input type="password" placeholder="비밀번호를 재입력해주세요" className={styles.input_pwd2}/>
            <span className={styles.span_pwd}></span>
          </div>

          <div className="nickname">
            <input type="text" placeholder="닉네임을 입력해주세요(2~12글자)" className={styles.input_nick}/>
            <span className={styles.span_nick}></span>
          </div>
          
          <button type="submit" className={styles.submit}>회원가입</button>
      </div>
  );
}

export default Register;