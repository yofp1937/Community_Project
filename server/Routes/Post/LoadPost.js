const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();

router.get("/", async (req, res) => {
        try {
            const posts = await Post.find().sort({ _id: -1 }).populate('author', 'nickname');
            
            console.log(posts)
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;