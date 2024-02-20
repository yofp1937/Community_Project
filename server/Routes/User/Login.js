const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const seceretkey = 'sdgl@sqwjodpa#sbn'; // token 생성에 사용하기위해 키보드 막 쳐서 생성한 시크릿키

router.post(
    "/",
    async (req, res) => {
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
                const token = jwt.sign({ id: user.id }, seceretkey, {expiresIn: '30m'}); //expiresIn을 30m으로 설정해서 30분이 지나면 토큰이 만료되게함
                console.log(id, "님 로그인");
                return res
                .json({id: id, nickname: user.nickname, token: token, success: true}); // success에 true값을 전송해서 LocalStorage에 값 설정
            } else { // 비밀번호가 일치하지않으면
                return res
                .status(400)
                .json({message: "아이디 혹은 비밀번호가 일치하지 않습니다."});
            }

        } catch (error) {
            console.log(error);
        }
    }
);

module.exports = router;