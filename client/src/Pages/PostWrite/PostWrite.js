import React, { useState } from 'react';
import styles from './PostWrite.module.css';
import axios from 'axios';

function PostWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleWrite = async () => {

        // 로그인 안돼있으면 작성 불가
        if(!localStorage.token){
            alert("글 쓰기는 로그인이 필요합니다.");
            window.location.href='/login';
            return;
        }
    
        // 글제목, 내용 입력 안돼있으면 return
        if(title === ""){
            alert("제목을 입력해주세요.");
            return;
        } else if (title.length > 20){
            alert("제목은 20글자를 초과 할 수 없습니다.")
            return;
        }
        if(content === ""){
            alert("내용을 입력해주세요.");
            return;
        }
    
        // 조건 만족하면 서버로 글작성 요청
        try {
          const response = await axios.post('/api/postwrite', {
            title: title,
            content: content,
            author: localStorage.getItem("id"),
          });
    
          if(response){ // ture 넘어오면 글 작성 완료되고 메인으로 이동
            window.location.href = '/';
          } 
    
        } catch (error) {
          if (error.response.data.message) {
            alert("에러: " + error.response.data.message);
          } else {
            alert("에러 발생");
          }
        }
    
      };

  return (
    <div className={styles.postwrite}>
        <input type="text" className={styles.input_title} placeholder='제목을 입력하세요(최대 20글자)' onChange={(e) => setTitle(e.target.value)}/>
        <hr/>
        <textarea className={styles.input_content} placeholder='글 내용을 입력하세요' onChange={(e) => setContent(e.target.value)}/><br/>
        <hr/>
        <button type="button" className={styles.btn_submit} onClick={handleWrite}>등록</button>
    </div>
  );
}

export default PostWrite;