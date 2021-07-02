const router = require("express").Router()
const controller = require("./controller/controller")

router.get('/upper', controller.upper);

router.get('/middle',controller.middle);

router.get('/lower', controller.lower);

module.exports= router
