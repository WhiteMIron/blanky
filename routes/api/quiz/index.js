const router = require("express").Router()
const controller = require("./controller/controller")
const wrap = require("express-async-wrap")

router.get('/easy', controller.easy)

router.get('/chapter/:chapterId',controller.getChapterDetailInfo)
router.get('/play/chapter/:chapterId',wrap(controller.getQuestion))
router.get("/chapterRanks",controller.getChapterRank) //인기있는 챕터 요청
router.get("/chapterList",controller.getChapterList) //챕터 요청(솔로)
router.get("/dictionary",controller.getWordSearch) //단어 요청

module.exports= router
