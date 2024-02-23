import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import axios from 'axios';
import Pagination from "../Pagination/Pagination";
import { Link } from 'react-router-dom';

// 페이징 참고 글 - https://www.daleseo.com/react-pagination/
function App() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(8); // 표시할 게시글 숫자
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 페이지별 첫 게시물의 위치

  useEffect(() => {
    async function LoadPost(){
      try {
        const response = await axios.get('/api/loadpost');
        if(response.status === 200){ // true 넘어오면 게시글 배열로 저장
          setPosts(response.data);
        }
      } catch(error) {
        console.error('게시글 로딩 중 오류가 발생했습니다.', error.message);
      }
    }
    LoadPost(); // 게시글 페이지에 로딩
  }, []);

  return (
    <div className={styles.main}>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select type="number" value={limit} onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      <hr/>
      <div className={styles.post}>
        <span className={styles.num}></span>
        <span className={styles.title}>제목</span>
        <span className={styles.comments}>[댓글수]</span>
        <span className={styles.author}>작성자</span>
        <span className={styles.views}>조회수</span>
      </div>
      {posts.slice(offset, offset + limit).map(post => (
        <div className={styles.post} key={post._id}>
          <span className={styles.num}>{post.num}</span>
          <Link to={`/post/${post._id}`}><span className={styles.title}>{post.title}</span></Link>
          <span className={styles.comments}>[{post.comments.length}]</span>
          <span className={styles.author}>{post.author && post.author.nickname}</span>
          <span className={styles.views}>{post.views}</span>
        </div>
      ))}
      <hr/>
      <footer>
        <Pagination total={posts.length} limit={limit} page={page} setPage={setPage}/>
      </footer>
    </div>
    
  );
}

export default App;