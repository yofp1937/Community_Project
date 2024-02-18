const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        const { id, password } = req.body;

        try {
            let user = await User.findOne({ id: id });
            if (!user) { // id가 존재하지 않으면
                return res
                .status(400)
                .json({ loginSucess: false,
                        message: "아이디가 존재하지 않습니다." });
            }

            // 입력받은 패스워드와 DB에 입력된 패스워드 비교
            const Match = await bcrypt.compare(password, user.password);

            console.log(Match)
            res.redirect("/")

        } catch (error) {
            console.log("로그인 안댐")
        }
    }
);

module.exports = router;