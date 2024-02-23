const express = require('express');
const moment = require('moment');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const router = express.Router();

router.post("/", async (req, res) => {
        const { postnum, content, author } = req.body; // Comment DB 컬럼 : postnum, content, author, date
        const date = moment().format('YYYY.MM.DD HH:mm');

        try {
            let user = await User.findOne({ id: author });
            if (!user) { // id가 존재하지 않으면
                return res
                .json({message: "예기치 못한 오류 발생, 다시 로그인해주세요"});
            }

            let post = await Post.findOne({ _id: postnum });
            if (!post) { // 게시글이 존재하지 않으면
                return res
                .json({message: "존재하지 않는 게시글입니다."})
            }

            // comment 객체 생성
            comment = new Comment({ // 참조하는 객체는 _id만 저장하면 된다.
                postnum: post,
                content,
                date,
                author: user._id,
                authorNickname: user.nickname,
            });

            // DB에 Post 데이터 저장
            await comment.save();

            // 이후 post의 comments 필드값을 추가해줘야함
            post.comments.push(comment._id);
            await post.save();

            console.log(author, "님 댓글 달기 성공");
            res.send(true);
        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;