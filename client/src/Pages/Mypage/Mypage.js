import React from 'react';
import styles from './Mypage.module.css';

function Mypage() {
  return (
    <div className={styles.mypage}>
        <div className={styles.nick}>

        </div>

        <div className={styles.bar}>
          <span>작성글</span>
          <span>작성댓글</span>
        </div>
    </div>
  );
}

export default Mypage;