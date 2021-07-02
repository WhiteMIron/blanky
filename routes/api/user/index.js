const router = require ("express").Router()
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")
const uploadMiddleWare = require("../../../middlewares/upload").upload

router.get("/",wrap(controller.getUserInfo))
router.put("/",wrap(controller.changeUserInfo))
router.put("/profile",uploadMiddleWare.single('imgFile'),wrap(controller.changeUserProfile))
module.exports=router
