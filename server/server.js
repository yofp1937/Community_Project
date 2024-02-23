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

// /api/register 요청 들어오면 routes폴더의 register.js 실행(회원가입)
app.use('/api/register', require('./Routes/User/Register'));

// /api/idcheck 요청 들어오면 routes 폴더의 idcheck.js 실행(아이디 중복확인)
app.use('/api/idcheck', require('./Routes/User/IdCheck'));

// /api/nickcheck 요청 들어오면 routes 폴더의 nickcheck.js 실행(닉네임 중복확인)
app.use('/api/nickcheck', require('./Routes/User/NickCheck'));

// /api/login 요청 들어오면 routes 폴더의 login.js 실행(로그인)
app.use('/api/login', require('./Routes/User/Login'));

// /api/postwrite 요청 들어오면 routes 폴더의 postwrite.js 실행(글 작성)
app.use('/api/postwrite', require('./Routes/Post/PostWrite'));

// /api/loadpost 요청 들어오면 routes 폴더의 loadpost.js 실행(게시글 목록 불러오기)
app.use('/api/loadpost', require('./Routes/Post/LoadPost'));

// /api/post/_id 요청 들어오면 routes 폴더의 loadpostcontent.js 실행(게시글 내용 불러오기)
// 추가로 :_id값을 받아오기위해 일차적으로 /api/post/까지의 경로만 설정후 LoadPostContent에서 2차 경로로 /:_id로 params 값을 받아옴
app.use('/api/post/', require('./Routes/Post/LoadPostContent'));

// /api/commentwrite 요청 들어오면 routes 폴더의 CommentWrite.js 실행(댓글 작성)
app.use('/api/commentwrite', require('./Routes/Comment/CommentWrite'));

// 서버 동작 확인
app.listen(port, () => {
    console.log(`Server Connected! port:${port}`)
});