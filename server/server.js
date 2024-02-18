// Server 작성      
const express = require('express');
const app = express();
const port = 8000
const cors = require('cors');

// CORS 사용
app.use(cors());
app.use(express.json({ extended: false }));

// MongoDB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yofp1937:1q2w3e4r@study.k9utdkl.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err))

// /api/register 요청 들어오면 routes폴더의 register.js 실행(회원가입)
app.use('/api/register', require('./Routes/api/Register'));

// /api/idcheck 요청 들어오면 routes 폴더의 idcheck.js 실행(아이디 중복확인)
app.use('/api/idcheck', require('./Routes/api/IdCheck'));

// /api/nickcheck 요청 들어오면 routes 폴더의 nickcheck.js 실행(닉네임 중복확인)
app.use('/api/nickcheck', require('./Routes/api/NickCheck'));

// /api/login 요청 들어오면 routes 폴더의 login.js 실행(로그인)
app.use('/api/login', require('./Routes/api/Login'));

// 서버 동작 확인
app.listen(port, () => {
    console.log(`Server Connected! port:${port}`)
});