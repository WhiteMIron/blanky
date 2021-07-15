const router = require ("express").Router()
const { match } = require("../../../modules/socket/match")
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")

router.get("/",wrap(controller.getMatchHistory))
router.get("/round",wrap(controller.getRoundHistory))
router.get("/solo/history/match",wrap(controller.getSoloMatchHistory))
router.get("/solo/history/round/:matchHistoryId",wrap(controller.getSoloRoundHistory))

module.exports=router
