const express = require('express');
const User = require('../../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id } = req.body;

  try {
    let user = await User.findOne({ id: id });
    if (user) {
      return res.json({ exists: true }); // 이미 존재하는 아이디일 경우
    } else {
      return res.json({ exists: false }); // 사용 가능한 아이디일 경우
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;