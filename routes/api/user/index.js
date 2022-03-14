const router = require ("express").Router()
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")
const uploadMiddleWare = require("../../../middlewares/upload").upload

router.get("/statistics/:id",wrap(controller.getGraph)) //사용자 그래프 요청
router.get("/ranks",wrap(controller.getRanks)) //사용자 전체랭킹 요청

router.get("/:id",wrap(controller.getUserInfo))
// router.get("/statistics",wrap(controller.getGraph)) //사용자 그래프 요청
// router.get("/ranks",wrap(controller.getRanks)) //사용자 전체랭킹 요청
router.put("/",wrap(controller.changeUserInfo))
router.put("/profile",uploadMiddleWare.single('imgFile'),wrap(controller.changeUserProfile))
module.exports=router
