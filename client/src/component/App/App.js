import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function LoadPost(){
      try {
        const response = await axios.get('/api/loadpost');
        if(response.status === 200){ // true 넘어오면 게시글 배열로 저장
          setPosts(response.data);
          console.log(response.data);
        }
      } catch(error) {
        console.error('게시글 로딩 중 오류가 발생했습니다.', error.message);
      }
    }
    LoadPost(); // 게시글 페이지에 로딩
  }, []);

  return (
    <div className="main">
      <hr/>
      <div className='post'>
        <span className="num"></span>
        <span className="title">제목</span>
        <span className="comments">[댓글수]</span>
        <span className="author">작성자</span>
        <span className="views">조회수</span>
      </div>
      {posts.map(post => (
        <div className="post" key={post._id}>
          <span className="num">{post.num}</span>
          <span className="title">{post.title}</span>
          <span className="comments">[{post.comments.length}]</span>
          <span className="author">{post.author.nickname}</span>
          <span className="views">{post.views}</span>
        </div>
      ))}
      <hr/>
    </div>
  );
}

export default App;