const express = require('express');
const User = require('../../models/User');
const Post = require('../../models/Post');

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
            const posts = await Post.find({ author: user._id }).sort({ _id: -1 }).populate('author', 'nickname'); // populate로 author 값에 해당 객체의 nickname값 추가
            
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;