const express = require('express');
const Post = require('../../models/Post');
const fs = require('fs'); // base64 디코딩을 하기위해 추가

const router = express.Router();

router.get("/:_id", async (req, res) => { // :_id값을 params로 받아오기위해 "/"가 아닌 "/:_id" 사용
    try {
        const post = await Post.findById(req.params._id).populate('author', 'nickname').populate('comments'); // populate로 author 값에 해당 객체의 nickname값 추가

        if(!post){
            return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }

        // 게시글을 찾았으면 데이터 전달하기전 조회수 1 증가
        post.views += 1;
        await post.save();

        res.status(200).json(post);
        
    } catch (error) {
        console.error('게시물 조회 중 오류:', error.message);
        res.status(500).json({ error: '서버 오류: 게시물을 조회할 수 없습니다.' });
    }
}
);

module.exports = router;