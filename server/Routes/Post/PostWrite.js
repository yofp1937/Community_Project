const express = require('express');
const moment = require('moment');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

router.post("/", async (req, res) => {
        const { title, content, author } = req.body; // Post DB 컬럼 : title, content, date, author, views, comments
        const date = moment().format('YYYY.MM.DD HH:mm');

        try {
            let user = await User.findOne({ id: author });
            if (!user) { // id가 존재하지 않으면
                return res
                .json({message: "예기치 못한 오류 발생, 다시 로그인해주세요"});
            }

            // Post 객체 생성
            post = new Post({
                title,
                content,
                date,
                author: user._id, // Post 컬렉션(관계형 DB의 table)의 author 필드(관계형 DB의 column)는 User 컬렉션의 문서(관계형 DB의 record)를 참조하는데
                                  // 참조하면 해당 문서의 모든값이 표시된다길래 하나의 User 문서를 author 저장하면 되는줄 알았는데 그 문서의 _id만 저장해야한다.
            });

            // DB에 Post 데이터 저장
            await post.save();
            console.log(author, "님 글 쓰기 성공");
            res.send(true);

        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;