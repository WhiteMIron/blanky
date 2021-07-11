const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const jwt =require('jsonwebtoken')
require("dotenv").config()

exports.getUserInfo=async (req, res) => {

  const id = await getUserIdByJwt(req.headers.auth)
  const row= await userService.getUserById(id)
  const [rows]= await userService.getUserByRank()
  var j = 1
  var k = 1
  var m = 0
  for (var i = 0; i < rows[0].length; i++) {
    if (i > 0) {
      if (rows[0][i].score == rows[0][i - 1].score) {
        j
        k++
      }
      else {
        j += k
        k = 1
      }
    }
    if (rows[0][i].id == id) {
      m = j
    }
  }
  user={
    id:row[0].id,
    nickname:row[0].user_nickname,
    email:row[0].user_email,
    school:row[0].user_school,
    dualScore:row[0].user_dual_score,
    soloScore:row[0].user_solo_score,
    profileImg:row[0].user_profile_img,
    description:row[0].user_description,
    rank:m,
    totalRank:rows[1][0].count
  }
  var jObj =  new Object()
  jObj.code=200
  jObj.message="회원정보조회 성공"
  jObj.data =user
  // console.log(user)
  res.status(200).send(jObj )
}

exports.changeUserInfo= async(req,res) =>{

  const user = req.body
  const id = await getUserIdByJwt(req.headers.auth)

  await userService.changeUserInfo(user,id)
  res.status(201).send({code:201,message:"유저정보 변경 성공"})

}

exports.changeUserProfile = async(req,res) => {
  console.log("요청 들어옴")
  let profile = req.file.location;
  console.log(profile)
  const id = await getUserIdByJwt(req.headers.auth)
  await userService.changeUserProfile(profile,id)
  res.status(201).send({code:201,message:"유저 프로필 변경 성공"})
}

exports.getGraph = async(req,res) => {
  let id = await getUserIdByJwt(req.headers.auth)
  // let id =2211
  const [rows]= await userService.getGraph(id)

  res.send({
    dayStat: rows[0],
    weekStat: rows[1],
    monthStat: rows[2]
  })
  console.log('User Graph select success')
}

exports.getRank = async(req,res) => {
  const [rows]= await userService.getRanks()

  var resultJson = [];
  var j = 1
  var k = 1
  for (var i = 0; i < rows.length; i++) {
    if (i > 0) {
      if (rows[i].score == rows[i - 1].score) {
        j
        k++
      }
      else {
        j += k
        k = 1
      }
    }
    resultJson.push(
      {
        rankNum: j,
        id: rows[i].id,
        name: rows[i].name,
        score: rows[i].score,
        img: rows[i].img
      }
    )
  }
  let jObj = new Object()
  jObj.code = 200
  jObj.data = resultJson
  res.send(jObj)
  console.log('User Ranks select success')
}

// exports.getChapterRank = async(req,res) => {
//   const [rows]= await userService.getChapterRanks()

//   res.send({
//     chapterRank: rows
//   })
//   console.log('User ChapterRank select success')
// }

async function getUserIdByJwt(token){
  const decoded = jwt.verify(token, process.env.secret)
  const id = decoded.userId
  return id
}
