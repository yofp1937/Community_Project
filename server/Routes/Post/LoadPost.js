const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();

router.get("/", async (req, res) => {
        try {
            const posts = await Post.find().sort({ _id: -1 }).populate('author', 'nickname'); // populate로 author 값에 해당 객체의 nickname값 추가
            
            return res.status(200).json(posts);
        } catch (error) {
            return res.send(error);
        }
    }
);

module.exports = router;