const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { nick } = req.body;

  try {
    let user = await User.findOne({ nick: nick });
    if (user) {
      res.json({ exists: true }); // 이미 존재하는 닉네임일 경우
    } else {
      res.json({ exists: false }); // 사용 가능한 닉네임일 경우
    }
  } catch (error) {
    console.error("중복 체크 에러: ", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;