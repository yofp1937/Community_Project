const express = require('express');
const moment = require('moment');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { articleFormDataHandler, fileNameParser } = require('../../config/multer.middleware');

const router = express.Router();

// articleFormDataHandler에서 req.files에 파일 데이터를 담아주고, req.body에 텍스트 데이터를 담아줌
router.post("/", articleFormDataHandler, async (req, res) => {
    const textData = JSON.parse(req.body.data);
    const date = moment().format('YYYY.MM.DD HH:mm');

    try {
        let user = await User.findOne({ id: textData.author });
        if (!user) { // id가 존재하지 않으면
            return res
            .json({message: "예기치 못한 오류 발생, 다시 로그인해주세요"});
        }

        let images = [];
        if(req.files && req.files['files']){ // 파일 존재하면 파일에대한 처리
            const files = req.files['files'].map(file => ({...file, originalname: fileNameParser(file.originalname)})); // map 을 이용해 파일 이름 한국어 깨지지 않도록 함
            // 이미지 파일들을 바이트 배열로 변환하여 저장
            for (let i = 0; i < files.length; i++) {
                const imgFile = files[i];
                const imgData = imgFile.buffer;
                const base64Image = Buffer.from(imgData).toString('base64'); // 이미지를 바이트 배열로 변환하여 base64 문자열로 인코딩
                images.push(base64Image); // 이미지를 images 배열에 추가
            }
        }

        // Post 객체 생성
        post = new Post({
            title: textData.title,
            content: textData.content,
            date,
            author: user._id, // 참조하는 값은 해당 개체의 _id 줘야함
            img: images,
        });

        // DB에 Post 데이터 저장
        await post.save();
        return res.send(true); // send(true)를 보내면 status(200)이 보내진것과 동일

    } catch (error) {
        return res.send(error);
    }
});

module.exports = router;