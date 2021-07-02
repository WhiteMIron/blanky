const router = require("express").Router()
const userService = require("../services/user")



router.get("/statistics", async function(req,res){
    // const id = await findByGraphStatistics(req.headers.user_id)
    const [rows]= await userService.getGraph(2220)
    res.send({
      dayStat: rows[0],
      weekStat: rows[1],
      monthStat: rows[2]
    })
    console.log(rows)
    console.log('User Score select success')

})

module.exports=router