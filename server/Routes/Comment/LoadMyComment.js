const express = require('express');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const router = express.Router();

router.post("/", async (req, res) => {
        const { id } = req.body;
        try {
            let user = await User.findOne({ id: id });
            if (!user) { // id가 존재하지 않으면
                return res
                .status(400)
                .json({message: "예기치 못한 오류 발생, 다시 로그인해주세요"});
            }
            const comments = await Comment.find({ author: user._id }).sort({ _id: -1 }).populate({
                path: 'postnum', // postnum에 _id, title, comments 데이터를 넣어서 보낼예정
                select: 'title comments',
            });
            
            res.status(200).json(comments);
        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;