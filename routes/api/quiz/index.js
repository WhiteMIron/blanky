const router = require("express").Router()
const controller = require("./controller/controller")

router.get('/easy', controller.easy)

router.get('/difficulty/:difficulty',controller.getChapterInfo)
router.get('/chapter/:chapterId',controller.getChapterDetailInfo)
router.get('/play/chapter/:chapterId',controller.getQuestion)
router.get("/chapterRanks",controller.getChapterRank) //인기있는 챕터 요청
router.get("/wordSearch",controller.getWordSearch) //단어 요청

module.exports= router
