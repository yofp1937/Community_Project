import React, { useState, useEffect, useRef } from 'react';
import styles from './Mypage.module.css';
import axios from 'axios';
import Pagination from "../../component/Pagination/Pagination";
import { Link } from 'react-router-dom';

function Mypage() {
  // 작성글, 작성댓글 선택 확인
  const [togglePost, setTogglePost] = useState(true);
  const [toggleComment, setToggleComment] = useState(false);

  // 닉네임 중복체크용
  const [nickname, setNickname] = useState("");
  const [changeNick, setChangeNick] = useState(false); // changeNick이 true가되면 닉네임 변경용 태그들이 화면에 렌더링됨
  const [nickChecked, setNickChecked] = useState(false); // nickChecked가 true가 되야 닉네임 변경 진행 가능(중복검사)
  const [nickMsg, setNickMsg] = useState(""); // 중복여부 메세지 표시용
  const nickInputRef = useRef(null); // 중복검사 통과하면 더이상 변경 못하게 block을 주기위해 input태그와 연결돼있음

  // 작성글, 작성댓글, 페이징용
  const [myposts, setMyPosts] = useState([]);
  const [mycomments, setMyComments] = useState([]);
  const [limit] = useState(8); // 표시할 게시글 숫자
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const offset = (page - 1) * limit; // 페이지별 첫 게시물의 위치

  // 닉네임 변경 클릭시 실행
  const handleNickEdit = () => {
    setChangeNick(true); // 닉네임 변경을 위한 태그들 화면에 생성
  };

  // 닉네임 변경 완료 클릭시 실행
  const handleNickSubmit = async() => {
    // 중복체크 안했으면 return
    if (!nickChecked) {
      nickInputRef.current.focus();
      alert("닉네임 중복체크가 필요합니다.");
      return;
    }

    // 서버에 닉네임 변경 요청
    try {
      const response = await axios.post('/api/nickchange', {
        id: localStorage.getItem("id"),
        changenick: nickname,
      });

      // 변경 성공하면 localStorage의 닉네임값도 변경후 새로고침해서 화면 로고 위 닉네임 표시 변경
      if(response.status === 200){
        localStorage.removeItem('nickname');
        localStorage.setItem('nickname', nickname);
        window.location.reload();
      }

    } catch (error) {
      if (error.response.data) {
        alert("에러: " + error.response.data);
      } else {
        alert("에러 발생");
      }
    }

    setChangeNick(false); // 닉네임 변경 끝나면 태그들 화면에서 없앰
  };

  // 닉네임 중복체크 클릭시 실행
  const handleNickCheck = async() => {
    // 2~12글자인지 체크
    if(nickname.length < 2 || nickname.length > 12){
      setNickChecked(false); // 중복체크 상태 false로 변경
      setNickMsg("닉네임은 2~12 글자입니다.");
      return; 
    }

    try {
      const response = await axios.post('/api/nickcheck', {
        nick: nickname,
      });

      if(response.data.exists) {
        setNickChecked(false); // 중복체크 상태 false로 변경
        setNickMsg("이미 사용중인 닉네임 입니다.");
      } else {
        setNickChecked(true); // 중복체크 상태 true로 변경
        nickInputRef.current.disabled = true;
        setNickMsg("사용 가능한 닉네임입니다.");
      }

    } catch (error) {
      if (error.response.data) {
        alert("에러: " + error.response.data);
      } else {
        alert("에러 발생");
      }
    }
  }

  // 작성글 불러오는 함수
  const handleSetPost = async() => {
    try {
        const response = await axios.post('/api/loadmypost', {
          id: localStorage.getItem("id"),
        });
        if(response.status === 200){ // true 넘어오면 게시글 myposts에 저장
          setMyPosts(response.data);
        }
    } catch(error) {
      if (error.response.data) {
        alert("에러: " + error.response.data);
      } else {
        alert("에러 발생");
      }
    }
  }

  // 작성댓글 불러오는 함수
  const handleSetComment = async() => {
    try {
      const response = await axios.post('/api/loadmycomment', {
        id: localStorage.getItem("id"),
      });
      if(response.status === 200){ // true 넘어오면 댓글 mycomments에 저장
        setMyComments(response.data);
      }
  } catch(error) {
    if (error.response.data) {
      alert("에러: " + error.response.data);
    } else {
      alert("에러 발생");
    }
  }
  }

  useEffect(() => {
    handleSetPost(); // 마이페이지 들어오면 작성글 로딩
  }, []);

  return (
    <div className={styles.mypage}>
        <div className={styles.nick}>
          <span className={styles.span_nick}>{localStorage.nickname} ({localStorage.id})</span>
          {changeNick ? (
            <>
              <input type="text" className={styles.input_nick} placeholder="새로운 닉네임 입력(2~12글자)" onChange={(e) => setNickname(e.target.value)} ref={nickInputRef}/>
              <span className={nickChecked ? styles.success : styles.error}>{nickMsg}</span>
              <button className={styles.btn_check} onClick={handleNickCheck}>중복 체크</button>
              <button className={styles.btn_submit} onClick={handleNickSubmit}>완료</button>
            </>
          ) : (
              <span className={styles.change} onClick={handleNickEdit}>닉네임 변경</span>
          )}
        </div>
        <hr/>

        <div className={styles.bar}>
          <span className={`${styles.span_mypost} ${togglePost ? styles.bold : ''}`} onClick={() => {setTogglePost(true); setToggleComment(false); handleSetPost();}}>작성글</span>
          <span className={`${styles.span_mycomment} ${toggleComment ? styles.bold : ''}`} onClick={() => {setTogglePost(false); setToggleComment(true); handleSetComment();}}>작성댓글</span>
        </div>
        <hr/>

        {togglePost && (
          <>
            <div className={styles.postlist}>
              <span className={styles.span_title}>제목</span>
              <span className={styles.span_comments}>[댓글수]</span>
              <span className={styles.span_author}>작성자</span>
              <span className={styles.span_views}>조회수</span>
            </div><br/>
            <hr/>
            {myposts.length > 0 ? (
              myposts.slice(offset, offset + limit).map(post => (
                <div className={styles.postlist} key={post._id}>
                  <Link className={styles.Link} to={`/post/${post._id}`}>
                    <span className={styles.span_title}>{post.title}</span>
                    <span className={styles.span_comments}>[{post.comments.length}]</span>
                    <span className={styles.span_author}>{post.author && post.author.nickname}</span>
                    <span className={styles.span_views}>{post.views}</span><br/>
                  </Link>
                  <hr/>
                </div>
              ))
            ) : (
              <p>작성한 게시글이 없습니다. 게시글을 작성해보세요!</p>
            )}
            <Pagination total={myposts.length} limit={limit} page={page} setPage={setPage}/>
          </>
        )}

        {toggleComment && (
          <>
            {mycomments.length > 0 ? (
              mycomments.slice(offset, offset + limit).map(comment => (
                <div className={styles.commentlist} key={comment._id}>
                  <Link className={styles.Link} to={`/post/${comment.postnum && comment.postnum._id}`}>
                    <span className={styles.span_content}>{comment.content}</span><br/>
                    <span className={styles.span_date}>{comment.date}</span><br/><br/>
                    <span className={styles.span_posttitle}>{comment.postnum && comment.postnum.title}</span>
                    <span className={styles.span_postcomment}>[{comment.postnum && comment.postnum.comments.length}]</span>
                  </Link>
                  <hr/>
                </div>
              ))
            ) : (
              <p>작성한 댓글이 없습니다. 댓글을 작성해보세요!</p>
            )}
            <Pagination total={mycomments.length} limit={limit} page={page} setPage={setPage}/>
          </>
        )}

    </div>
  );
}

export default Mypage;