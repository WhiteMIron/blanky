const queries = require("../sql/user")
const CustomError = require("../error/custum-error");
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
    await queries.saveUserAdditionalInfo(User)
}

exports.changeUserInfo = async(User,id)=>{
    await queries.modifyUserInfo(User,id)
}

exports.changeUserProfile =  async(profile,id)=>{
  await queries.modifyUserProfile(profile,id)
}

exports.changeUserScore = async(id,attainScore)=>{
  await queries.modifyUserScore(id,attainScore)
}

<<<<<<< HEAD

exports.getGraph =async (graphId)=>{
    rows = await queries.findByGraphStatistics(graphId)
    return rows
}

exports.getRanks =async (userId)=>{
    rows = await queries.findRanksByuserId(userId)
    return rows
=======
exports.getGraph =async (graphId)=>{
    rows = await queries.findByGraphStatistics(graphId)
    return rows
>>>>>>> 47612d54d1ab08a00118c09696d90110425ad41e
}