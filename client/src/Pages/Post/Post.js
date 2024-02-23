import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
  const { _id } = useParams(); // /post/_id와 동일한 변수명으로 데이터를 꺼낼 수 있다.
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/post/${_id}`);
        if(response.status === 200){
          setPost(response.data);
        }
      } catch(error) {
        console.error('에러:', error.message);
      }
    };
    getPost(); // useEffect 내에서 getBoard 함수를 호출
  }, [_id]); // _id 값이 변경될 때마다 useEffect를 다시 실행

  const handleSubmit = async () => {
    if(!localStorage.token){
      alert("로그인이 필요합니다.");
      return;
    }
    // 댓글 내용 없으면 return
    if(content.trim() === ""){
      alert("댓글 내용을 작성해주세요");
      return;
    }
    // 조건 만족하면 서버로 로그인 요청
    try {
      const response = await axios.post('/api/commentwrite', {
        postnum: post._id,
        content: content,
        author: localStorage.getItem("id"),
      });

      if(response){
        window.location.reload();
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
    <div className={styles.post}>
        <hr/>
        <div className={styles.info}>
          <span className={styles.title}>{post.title}</span>
          <span className={styles.date}>{post.date}</span>
          <br/><br/><br/>
          <span className={styles.author}>작성자: {post.author && post.author.nickname}</span>
          <span className={styles.views}>조회수 {post.views}</span>
        </div>

        <hr/>
        <div className={styles.content}>{post.content}</div>
        <hr/>

        <div className={styles.comments}>
          <input type="textarea" className={styles.input_comment} placeholder='댓글을 남겨보세요' onChange={(e) => setContent(e.target.value)}></input>
          <button type="submit" className={styles.submit} onClick={handleSubmit}>등록</button>

          {post.comments && post.comments.length > 0 ? (
            post.comments.map(comment => (
              <div className={styles.div_comment} key={comment._id}>
              <hr/>
                <span className={styles.comment_author}>{comment.authorNickname}</span>
                <span className={styles.comment_date}>{comment.date}</span><br/><br/>
                <span className={styles.comment_content}>{comment.content}</span><br/><br/>
              </div>
            ))
          ) : (
            <p>아직 댓글이 없습니다. 첫번째 댓글을 작성해보세요!</p>
          )}
        </div>
        <hr/>
    </div>
  );
}

export default Post;