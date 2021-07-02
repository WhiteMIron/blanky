const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const jwt =require('jsonwebtoken')
require("dotenv").config()


exports.getUserInfo=async (req, res) => {

  const id = await getUserIdByJwt(req.headers.auth)
  const row= await userService.getUserbyId(id)

  user={
    id:row[0].id,
    nickname:row[0].user_nickname,
    email:row[0].user_email,
    school:row[0].user_school,
    dualScore:row[0].user_dual_score,
    soloScore:row[0].user_solo_score,
    profileImg:row[0].user_profile_img,
    description:row[0].user_description,
    "rank":1,
    "totalRank" :12500
  }
  var jObj =  new Object()
  jObj.code=200
  jObj.message="회원정보조회 성공"
  jObj.data =user
  console.log(user)
  res.status(200).send(jObj )
}

exports.changeUserInfo= async(req,res) =>{

  const user = req.body
  const id = await getUserIdByJwt(req.headers.auth)

  await userService.changeUserInfo(user,id)
  res.status(201).send({code:201,message:"유저정보 변경 성공"})

}

exports.changeUserProfile = async(req,res) => {
  let profile = req.file.location;
  const id = await getUserIdByJwt(req.headers.auth)
  await userService.changeUserProfile(profile,id)
}


exports.getGraph = async(req,res) => {
  let id = await getUserIdByJwt(req.headers.auth)
  const [rows]= await userService.getGraph(id)
  
  res.send({
    dayStat: rows[0],
    weekStat: rows[1],
    monthStat: rows[2]
  })
  console.log(rows)
  console.log('User Score select success')
}


async function getUserIdByJwt(token){
  const decoded = jwt.verify(token, process.env.secret)
  const id = decoded.userId
  return id
}
