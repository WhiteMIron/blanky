const router = require("express").Router()
const auth = require("./auth/index")
const user = require("./user/index")
const quiz = require("./quiz/index")
const match = require("./match/index")

const middlewares = require('../../middlewares/auth')
const wrap = require("express-async-wrap")
//로그인
router.use('/quiz',quiz)
router.use('/auth',auth) 
router.use('/match',match)

router.use('/',wrap(middlewares.verifyToken))
router.use('/user',user)
// router.use('/match',match)

router.get('/test',function(req,res){
    token = req.headers.auth
    console.log(token)
    console.log("test")
    res.send({"code":"200","message":"test success"})
})


module.exports =router
