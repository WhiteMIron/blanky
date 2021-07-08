const router = require("express").Router()
const controller = require("./controller/controller")

router.get('/upper', controller.upper)
router.get('/middle',controller.middle)
router.get('/lower', controller.lower)

router.get('/difficulty/:difficulty',controller.getChapterInfo)
router.get('/chapter/:chapterId',controller.getChapterDetailInfo)

module.exports= router
