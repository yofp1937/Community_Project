const express = require('express');
const User = require('../../models/User');
const Comment = require('../../models/Comment');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, changenick } = req.body; // id는 접속중인 유저의 id, changenick은 변경할 닉네임

  try {
    let user = await User.findOne({ id: id }); // 유저 id로 db에서 객체 찾기
    if (!user) { // id가 존재하지 않으면
        return res
        .status(400)
        .send("예기치 못한 오류 발생, 다시 로그인해주세요");
    }

    // 작성된 댓글들 작성자도 변경해줘야함
    let comments = await Comment.find({ authorNickname: user.nickname });
    if (comments.length > 0) { // 작성한 댓글이 존재하면
        for(let comment of comments){
            comment.authorNickname = changenick;
            await comment.save();
        }
    }

    // 댓글 닉네임 다 바꾸면 유저 닉네임도 변경
    user.nickname = changenick;
    await user.save();

    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;