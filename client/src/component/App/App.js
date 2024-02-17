import React from 'react';
import './App.css';

function App() {
  return (
    <div className="main">
      <hr/>
      <div className="post">
        <span className="num">번호</span>
        <span className="title">제목</span>
        <span className="comments"> [0] </span>
        <span className="author">작성자</span>
        <span className="views">조회수</span>
      </div>
      <hr/>
    </div>
  );
}

export default App;