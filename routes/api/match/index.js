const router = require ("express").Router()
const { match } = require("../../../modules/socket/match")
const controller  = require('./controller/controller')
const wrap = require("express-async-wrap")

router.get("/history/dual",wrap(controller.getMatchHistory))
router.get("/history/dual/round",wrap(controller.getRoundHistory))
router.get("/history/solo",wrap(controller.getSoloMatchHistory))
router.post("/history/solo",wrap(controller.recordSoloMatchHistory))
router.get("/history/solo/round",wrap(controller.getSoloRoundHistory))

module.exports=router
