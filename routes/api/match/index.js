const router = require ("express").Router()
const { match } = require("../../../modules/socket/match")
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")

router.get("/",wrap(controller.getMatchHistory))
router.get("/round",wrap(controller.getRoundHistory))
module.exports=router
