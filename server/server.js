const express = require('express');
const cors = require('cors');
const port = 8000
const mongoose = require('mongoose')

// CORS 사용
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// MongoDB 연결
mongoose.connect('mongodb+srv://yofp1937:1q2w3e4r@study.k9utdkl.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));


// User 관련 요청
    // 회원가입
    app.use('/api/register', require('./Routes/User/Register'));
    // 아이디 중복확인
    app.use('/api/idcheck', require('./Routes/User/IdCheck'));
    // 닉네임 중복확인
    app.use('/api/nickcheck', require('./Routes/User/NickCheck'));
    // 로그인
    app.use('/api/login', require('./Routes/User/Login'));
    // 닉네임 변경
    app.use('/api/nickchange', require('./Routes/User/NickChange'));

// 게시글 관련 요청
    // 게시글 작성
    app.use('/api/postwrite', require('./Routes/Post/PostWrite'));
    // 게시글 목록 불러오기
    app.use('/api/loadpost', require('./Routes/Post/LoadPost'));
    // 게시글 내용 불러오기 + 추가로 :_id값을 받아오기위해 일차적으로 /api/post/까지의 경로만 설정후 LoadPostContent에서 2차 경로로 /:_id 설정해서 params 값을 받아옴
    app.use('/api/post/', require('./Routes/Post/LoadPostContent'));
    // 마이페이지 작성글 불러오기
    app.use('/api/loadmypost', require('./Routes/Post/LoadMyPost'));

// 댓글 관련 요청
    // 댓글 작성
    app.use('/api/commentwrite', require('./Routes/Comment/CommentWrite'));
    // 마이페이지 작성댓글 불러오기
    app.use('/api/loadmycomment', require('./Routes/Comment/LoadMyComment'));

// 서버 실행
app.listen(port, () => {
    console.log(`Server Connected! port:${port}`)
});