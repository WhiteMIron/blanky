const router = require("express").Router()
const auth = require("./auth/index")
const user = require("./user/index")
const quiz = require("./quiz/index")

const middlewares = require('../../middlewares/auth')
const wrap = require("express-async-wrap")
//로그인
router.use('/quiz',quiz)
router.use('/auth',auth)   //<= 카카오 사용자 정보조회 , 토큰 생성까지함
router.use('/',wrap(middlewares.verifyToken))
router.use('/user',user)


router.get('/test',function(req,res){
    token = req.headers.auth
    console.log(token)
    console.log("test")
    res.send({"code":"200","message":"test success"})
})


module.exports =router
