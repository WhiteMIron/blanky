const router = require ("express").Router()
const controller  = require('./controller/controller')
// const middlewares = require('../../../middlewares/auth')
const wrap = require("express-async-wrap")
// router.post('/register',controller.register())


// router.get("/kakao/login",controller.kakaoLogin)
// router.get("/login",wrap(controller.login))
router.get("/kakao/login",wrap(controller.kakaoLogin))
router.post("/signup",  wrap(controller.signup))

module.exports=router
