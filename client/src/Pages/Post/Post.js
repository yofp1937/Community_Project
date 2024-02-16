import React from 'react';
import styles from './Post.module.css';

function Post() {
  return (
    <div className={styles.post}>
        <hr/>
        <div className={styles.info}>
          <span className={styles.title}>제목이길어지면어떻게될까</span>
          <span className={styles.date}>2024.01.01. 00:00</span>
          <br/><br/><br/>
          <span className={styles.author}>작성자</span>
          <span className={styles.views}>조회수 0</span>
        </div>

        <hr/>
        <div className={styles.content}>내용</div>
        <hr/>

        <div className={styles.comments}>
          <input type="textarea" className={styles.input_comment} placeholder='댓글을 남겨보세요'></input>
          <button type="submit" className={styles.submit}>등록</button>

          <div className={styles.comment}>
            <span className={styles.comment_author}>댓글 작성자</span>
            <span className={styles.comment_date}>2023.12.31. 23:59</span><br/><br/>
            <span className={styles.comment_content}>댓글 내용</span><br/><br/>
            <hr/>
          </div>

        </div>
        <hr/>
    </div>
  );
}

export default Post;