const express = require('express');
const moment = require('moment');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { articleFormDataHandler, fileNameParser } = require('../../config/multer.middleware');

const router = express.Router();

// articleFormDataHandler에서 req.files에 파일 데이터를 담아주고, req.body에 텍스트 데이터를 담아줌
router.post("/", articleFormDataHandler, async (req, res) => {
        const files = req.files['files'].map(file => ({...file, originalname: fileNameParser(file.originalname)})); // map 을 이용해 파일 이름 한국어 깨지지 않도록 함
        const textData = JSON.parse(req.body.data);
        const date = moment().format('YYYY.MM.DD HH:mm');

        try {
            let user = await User.findOne({ id: textData.author });
            if (!user) { // id가 존재하지 않으면
                return res
                .json({message: "예기치 못한 오류 발생, 다시 로그인해주세요"});
            }

            let images = [];
            // 이미지 파일들을 바이트 배열로 변환하여 저장
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) { // 반복문으로 배열 갯수만큼 실행
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
                author: user._id, // Post 컬렉션(관계형 DB의 table)의 author 필드(관계형 DB의 column)는 User 컬렉션의 문서(관계형 DB의 record)를 참조하는데
                                  // 참조하면 해당 문서의 모든값이 표시된다길래 하나의 User 문서를 author 저장하면 되는줄 알았는데 그 문서의 _id만 저장해야한다.
                img: images,
            });

            // DB에 Post 데이터 저장
            await post.save();
            console.log(textData.author, "님 글 쓰기 성공");
            res.send(true);

        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;