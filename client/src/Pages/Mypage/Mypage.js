import React from 'react';
import styles from './Mypage.module.css';

function Mypage() {
  return (
    <div className={styles.mypage}>
        <div className={styles.nick}>
          <span className={styles.span_nick}>닉네임</span>
          <a href="#">변경</a>
        </div>

        <hr/>

        <div className={styles.bar}>
          <span className={styles.post}>작성글</span>
          <span className={styles.comment}>작성댓글</span>
        </div>

        <hr/>

        <div className={styles.postlist}>
          작성글 리스트
        </div>

        <div className={styles.commentlist}>
          작성댓글 리스트
        </div>
    </div>
  );
}

export default Mypage;