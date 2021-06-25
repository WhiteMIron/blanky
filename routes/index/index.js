
const router = require("express").Router()

router.get("/",function(req,res,body){
    res.send("index페이지")
})


module.exports=router
