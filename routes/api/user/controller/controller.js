const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const jwt =require('jsonwebtoken')
require("dotenv").config()

exports.getUserInfo=async (req, res) => {
  let id = await getUserIdByJwt(req.headers.auth)
  if(req.params.id != id){
    // console.log("req:",req.params.id)
    id = req.params.id
  }
  // console.log("id:",id)

  const [row]= await userService.getUserById(id)

  user={
        id:row[0][0].id,
        nickname:row[0][0].name,
        email:row[0][0].email,
        school:row[0][0].school,
        dualScore:row[0][0].score,
        profileImg:row[0][0].img,
        description:row[0][0].description,
        rank:row[0][0].ranknum,
        totalRank:row[1][0].count
     }
    var jObj =  new Object()
    jObj.code=200
    jObj.message="회원정보조회 성공"
    jObj.data =user
  // console.log(user)
  res.status(200).send(jObj)
}

exports.changeUserInfo= async(req,res) =>{

  const user = req.body
  const id = await getUserIdByJwt(req.headers.auth)

  await userService.changeUserInfo(user,id)
  res.status(201).send({code:201,message:"유저정보 변경 성공"})

}


exports.changeUserProfile = async(req,res) => {
  let profile = req.file.transforms[0].location
  const id = await getUserIdByJwt(req.headers.auth)
  await userService.changeUserProfile(profile,id)
  res.status(201).send({code:201,message:"유저 프로필 변경 성공"})
}


// exports.changeUserProfile = async(req,res) => {
//   console.log("요청 들어옴")
//   let profile = req.file.location;
//   console.log(profile)
//   const id = await getUserIdByJwt(req.headers.auth)
//   await userService.changeUserProfile(profile,id)
//   res.status(201).send({code:201,message:"유저 프로필 변경 성공"})
// }

exports.getGraph = async(req,res) => {
  let id = await getUserIdByJwt(req.headers.auth)
  // console.log("요청 id:",req.params.id)
  if(req.params.id != id){
    id = req.params.id
  }
  const [rows]= await userService.getGraph(id)

  res.send({
    dayStat: rows[0],
    weekStat: rows[1],
    monthStat: rows[2]
  })
  // console.log('User Graph select success')
}

exports.getRanks = async(req,res) => {
  const [rows]= await userService.getRanks()

  let jObj = new Object()
  jObj.code = 200
  jObj.data = rows
  res.send(jObj)
  // console.log('User Ranks select success')
}


async function getUserIdByJwt(token){
  const decoded = jwt.verify(token, process.env.secret)
  const id = decoded.userId
  return id
}
