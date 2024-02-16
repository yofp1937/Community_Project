// Server 작성      
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const port = 8000

// CORS 사용
app.use(cors());

// MongoDB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yofp1937:1q2w3e4r@shoppingmall.r1xtsim.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err))

// API로 요청한 경우 메시지를 보내는 콜백 함수 추가
app.get('/api', (req, res) => {
    res.send({message : 'hello'})
});

// 서버 동작 확인
app.listen(port, () => {
    console.log(`Server Connected! port:${port}`)
});