const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/", async (req, res) => {
        const { id, password, nickname } = req.body;
        //console.log(id, password, nickname, req.body)

        try {
            let user = await User.findOne({ id:id });
            if (user) { // id가 이미 존재하면 아래 코드 실행
                console.log(id, " 아이디 중복");
                return res
                .status(400)
                .json({message: "이미 사용중인 아이디입니다."});
            }
            
            // id 존재하지 않으면 새로운 User 객체 만들어서 데이터 삽입
            user = new User({
                id,
                password,
                nickname,
            });
            
            // 패스워드 암호화
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // db에 User 객체 데이터 저장
            await user.save();
            
            return res.send(true);
        } catch (error) {
            return res.send(error);
        }
    }
);

module.exports = router;