import React, { useState, useRef } from 'react';
import styles from './Register.module.css';
import axios from 'axios';

function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  
  const [idChecked, setIdChecked] = useState(false);
  const [pwdChecked, setPwdChecked] = useState(false);
  const [nickChecked, setNickChecked] = useState(false);

  const [idMsg, setIdMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [nickMsg, setNickMsg] = useState("");

  const idInputRef = useRef(null);
  const nickInputRef = useRef(null);

  // 회원가입 버튼 클릭시 서버에 요청
  const handleRegister= async () => {
    
    // 정보 하나라도 입력 안돼있으면 return
    if(id==="" || password==="" || nickname===""){
      alert("정보를 전부 입력해주세요.");
      return;
    }

    // 아이디 중복체크 안돼있으면 return
    if (!idChecked) {
      idInputRef.current.focus();
      alert("아이디 중복체크가 필요합니다.");
      return;
    }

    // 비밀번호 두개가 불일치면 return
    if (!pwdChecked) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    // 닉네임 중복체크 안돼있으면 return
    if (!nickChecked) {
      nickInputRef.current.focus();
      alert("닉네임 중복체크가 필요합니다.");
      return;
    }

    // 조건을 다 만족하면 서버로 회원가입 요청
    try {
      const response = await axios.post('/api/register', {
        id: id,
        password: password,
        nickname: nickname,
      });

      if(response.data){
        alert("회원가입에 성공했습니다!");
        window.location.href = '/';
      } 

    } catch (error) {
      alert("에러 발생");
    }

  };

  // 아이디 중복체크 버튼 클릭시 서버에 요청
  const handleIdCheck = async () => {

    if(id.length < 4){
      setIdChecked(false);
      setIdMsg("아이디는 최소 4글자부터입니다.");
      return;
    }

    try {
      const response = await axios.post('/api/idcheck', {
        id: id,
      });

      if(response.data.exists) {
        setIdChecked(false);
        setIdMsg("이미 사용중인 아이디 입니다.");
      } else {
        setIdChecked(true);
        idInputRef.current.disabled = true;
        setIdMsg("사용 가능한 아이디입니다.");
      }

    } catch (error) {
      alert("에러 발생: ", error.message);
    }

  }

  // 비밀번호 2개 일치하는지 확인하여 표시
  function onChangePwd1(e) {
    const newPassword1 = e.target.value;
    setPassword(newPassword1);
    if (newPassword1 === password2) {
      setPwdChecked(true);
      setPwdMsg("패스워드가 일치합니다.");
    } else {
      setPwdChecked(false);
      setPwdMsg("패스워드가 일치하지 않습니다.");
    }
  }
  
  function onChangePwd2(e) {
    const newPassword2 = e.target.value;
    setPassword2(newPassword2);
    if (password === newPassword2) {
      setPwdChecked(true);
      setPwdMsg("패스워드가 일치합니다.");
    } else {
      setPwdChecked(false);
      setPwdMsg("패스워드가 일치하지 않습니다.");
    }
  }

  // 닉네임 중복체크 버튼 클릭시 서버에 요청
  const handleNickCheck = async () => {

    if(nickname.length < 2 || nickname.length > 12){
      setNickChecked(false);
      setNickMsg("닉네임은 2~12 글자입니다.");
      return; 
    }

    try {
      const response = await axios.post('/api/nickcheck', {
        nick: nickname,
      });

      if(response.data.exists) {
        setNickChecked(false);
        setNickMsg("이미 사용중인 닉네임 입니다.");
      } else {
        setNickChecked(true);
        nickInputRef.current.disabled = true;
        setNickMsg("사용 가능한 닉네임입니다.");
      }

    } catch (error) {
      alert("에러 발생: ", error.message);
    }

  }

  return (
      <div className={styles.register}>
          <div className={styles.id}>
            <input type="text" placeholder="아이디를 입력해주세요(최소 4글자)"className={styles.input_id} onChange={(e) => setId(e.target.value)} ref={idInputRef}/>
            <button type="button" className={styles.btn_check} onClick={handleIdCheck}>중복체크</button><br/>
            <span className={idChecked ? styles.success : styles.error}>{idMsg}</span>
          </div>

          <div className={styles.pwd}>
            <input type="password" placeholder="비밀번호를 입력해주세요" className={styles.input_pwd1} onChange={(e) => { setPassword(e.target.value); onChangePwd1(e)}}/><br/>
            <input type="password" placeholder="비밀번호를 재입력해주세요" className={styles.input_pwd2} onChange={(e) => { setPassword2(e.target.value); onChangePwd2(e)}}/><br/>
            <span className={pwdChecked ? styles.success : styles.error}>{pwdMsg}</span>
          </div>

          <div className="nickname">
            <input type="text" placeholder="닉네임을 입력해주세요(2~12글자)" className={styles.input_nick} onChange={(e) => setNickname(e.target.value)} ref={nickInputRef}/>
            <button type="button" className={styles.btn_check} onClick={handleNickCheck}>중복체크</button><br/>
            <span className={nickChecked ? styles.success : styles.error}>{nickMsg}</span>
          </div>
          
          <button type="button" className={styles.btn_register} onClick={handleRegister}>회원가입</button>
      </div>
  );
}

export default Register;