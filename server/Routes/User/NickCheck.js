const express = require('express');
const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { nick } = req.body;

  try {
    let user = await User.findOne({ nickname: nick });
    if (user) {
      return res.json({ exists: true }); // 이미 존재하는 닉네임일 경우
    } else {
      return res.json({ exists: false }); // 사용 가능한 닉네임일 경우
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;