import { Router } from "express";
import models, { Emails } from "../models" // models 의 파일 실행
const router = Router();


//회원가입
router.post('/register', async(req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    // async await 으로 이것 먼저 처리하게 함 
    const user1 =  await Emails.findOne({ where: { email, password }});
    if(user1){
        return res.json({
            "error": "User already exist"
        });
    }
    //user.create 전부 promise임 -> await 써야됨
    const email_list = await Emails.create({
        email,
        password,
    });

    return res.json({
        "data" : {
            user: {
                id: email_list.id
            }
        }
    });

});


//로그인
router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const user = await Emails.findOne({ where: { email, password }});

    //데이터베이스에서 아이디를 찾았을때 id 출력
    if(user) {
        return res.json({
            data : {
                user : {
                    id: user.id
                }
            }
        });
    }

    //아이디를 데이터베이스에서 못찾았을때
    return res.json({
        "error" : "User not exist"
    })
    
});




export default router;

