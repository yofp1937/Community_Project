const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const seceretkey = 'sdgl@sqwjodpa#sbn'; // token 생성에 사용하기위해 키보드 막 쳐서 생성한 시크릿키

router.post("/", async (req, res) => {
        const { id, password } = req.body;

        try {
            let user = await User.findOne({ id: id });
            if (!user) { // id가 존재하지 않으면
                return res
                .status(400)
                .json({message: "아이디 혹은 비밀번호가 일치하지 않습니다."});
            }

            // 입력받은 패스워드와 DB에 입력된 패스워드 비교
            const Match = await bcrypt.compare(password, user.password);

            if(Match){ // 비밀번호가 일치하면
                const token = jwt.sign({ id: user.id }, seceretkey); // 랜덤한 토큰값 생성
                //console.log(id, "님 로그인");
                return res
                .status(200) // 입력받은 password가 db의 값과 일치하면 status 200을 전송
                .json({id: id, nickname: user.nickname, token: token});
            } else { // 비밀번호가 일치하지않으면
                return res
                .status(400)
                .send("아이디 혹은 비밀번호가 일치하지 않습니다.");
            }

        } catch (error) {
            return res.send(error);
        }
    }
);

module.exports = router;