import React, { useState } from 'react';
import styles from './Mypage.module.css';

function Mypage() {
  const [togglePost, setTogglePost] = useState(true);
  const [toggleComment, setToggleComment] = useState(false);

  // 1.localStorage id값으로 id, nickname 받아와서 div .nick에 표시해줘야함
  // 2.변경버튼 누르면 옆에 input, span_success, span_error, btn_check 나타나게해서 닉네임 변경할수있게 만들어야함
  // 3.작성글 누르면 div .postlist에 내가 작성한 게시글 리스트 불러와야함
  //  +작성댓글 누르면 div .commentlist에 내가 작성한 댓글 리스트 불러와야함
  // 4.작성글, 작성댓글로 불러온것들 제목 클릭하면 해당 게시글로 이동하는 기능 만들어야함

  return (
    <div className={styles.mypage}>
        <div className={styles.nick}>
          <span className={styles.span_nick}>닉네임(id)</span>
          <a href="#" className={styles.change}>변경</a>
        </div>

        <hr/>

        <div className={styles.bar}>

          <span className={styles.post} onClick={() => {setTogglePost(true); setToggleComment(false);}}>작성글</span>
          <span className={styles.comment} onClick={() => {setTogglePost(false); setToggleComment(true);}}>작성댓글</span>

        <hr/>

        {togglePost && (
          <div className={styles.postlist}>
            작성글 리스트
          </div>
        )}

        {toggleComment && (
          <div className={styles.commentlist}>
            작성댓글 리스트
          </div>
        )}

      </div>
    </div>
  );
}

export default Mypage;