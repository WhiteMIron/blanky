const queries = require("../sql/user")
const CustomError = require("../error/custom-error");
const RegisterError =require("../error/register-error")
const authMiddleware  = require("../middlewares/auth")

exports.getUserByKakaoId= async(userKakaoId) =>{
    row = await queries.findOneByUserKakaoId(userKakaoId)
    return row
}

exports.getUserById= async(userId)=>{
    row = await queries.findOneByUserId(userId)
    return row
}


exports.loginCheck=async (userKakaoId) =>{

    rows=await queries.findOneByUserKakaoIdAndVerify(userKakaoId)
    return rows
}

exports.signup=async (User)=>{

    const row = await queries.findOneByUserKakaoId(User.kakaoId)
    if(row.length==1){
        var token = await authMiddleware.generateJwtToken(row[0].id,0)
        throw new RegisterError(410,"추가정보 미등록",token)
    }

    await queries.saveUser(User)
}

exports.signupAdditionalInfo = async(User)=>{
    let [row]=await queries.saveUserAdditionalInfo(User)
    return row[0].id
}

exports.changeUserInfo = async(User,id)=>{
    await queries.modifyUserInfo(User,id)
}

exports.changeUserProfile =  async(profile,id)=>{
  await queries.modifyUserProfile(profile,id)
}

exports.changeUserScore = async(id,attainScore)=>{
  // console.log("점수 변경 id:",id,"score:",attainScore)

  await queries.modifyUserScore(id,attainScore)
}

exports.getGraph =async (graphId)=>{
    rows = await queries.findByGraphStatistics(graphId)
    return rows
}

exports.getRanks =async ()=>{
    rows = await queries.findRanks()
    return rows
}


exports.getSampleImg = async() =>{
   let [rows] = await  queries.findSampleImg()
   // console.log("rows:",rows)
   let randomNum = Math.floor(Math.random() *  rows.length)
   let img = rows[randomNum].img

   return img
}
