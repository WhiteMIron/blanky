const router = require ("express").Router()
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")
const uploadMiddleWare = require("../../../middlewares/upload").upload

router.get("/",wrap(controller.getUserInfo))
router.put("/",wrap(controller.changeUserInfo))
router.get("/statistics",wrap(controller.getGraph)) //사용자 그래프 요청
router.put("/profile",uploadMiddleWare.single('imgFile'),wrap(controller.changeUserProfile))
module.exports=router
