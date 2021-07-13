const router = require("express").Router()
const controller = require("./controller/controller")

router.post('/paragraph',controller.registerParagraph);
router.put('/paragraph/:paragraphId',controller.changeParagraph)
router.put('/difficulty/paragraph/:paragraphId',controller.changeParagraphDifficulty)

module.exports= router
