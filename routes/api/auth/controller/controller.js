const queries = require("../../../../sql/user")
const authMiddleware  = require("../../../../middlewares/auth")
const userService = require("../../../../services/user")
const jwt =require('jsonwebtoken')
const TokenError = require("../../../../error/token-error")
const RegisterError = require("../../../../error/register-error")
require('dotenv').config()

const REST_API_KEY =process.env.REST_API_KEY
const REDIRECT_URI =process.env.REDIECT_URI

const BASIC_KAKAO_AUTH_URL ="https://kauth.kakao.com/"



// exports.kakaoLogin= (req,res)=>{
//
//     var url =BASIC_KAKAO_AUTH_URL +"oauth/authorize?"
//
//     var options ={
//         response_type : "code",
//         client_id :REST_API_KEY,
//         redirect_uri:REDIRECT_URI,
//         scope:"account_email",
//         // prompt:"login"
//
//     }
//
//     for(var option in options){
//         url+=option+"="+options[option]+"&"
//     }
//     url = url.substr(0,url.length-1)
//     console.log("RedirectUrl:",REDIRECT_URI)
//     res.redirect(url)
//
// }


exports.kakaoLogin=async (req,res,next)=>{
// exports.login=async (req,res,next)=>{

    // console.log("login수행")
    // var code = req.query.code
    // var token = await authMiddleware.getKakaoToken(code)
    // var accessToken = token.accessToken

    var accessToken = req.headers.auth
    var profile  = await authMiddleware.getKakaoProfile(accessToken)

    var kakaoId = profile.id
    var name = profile.name
    var email = profile.email
    var profileImg = profile.profileImg
    let row=await userService.loginCheck(kakaoId)

    if(row.length==1){

        let userId = row[0].id
        console.log("userId:",userId)
        token =await authMiddleware.generateJwtToken(userId,1)
        res.status(200).send({"code":200,"message":"로그인 성공","token":token})

    }
    else{
        console.log("추가정보 수행")
        user ={
            kakaoId:kakaoId,
            name:name,
            email:email,
            profileImg:profileImg
        }
        // wrap모듈을 사용해서 try -catch문 쓸 필요 없어짐 에러던져지면 알아서 캐치함
        // try{
        //   const row=await userService.register(user)
        // }catch(error){
        //   next(error)
        // }

        await userService.signup(user)

        row = await userService.getUserByKakaoId(kakaoId)
        let userId = row[0].id
        token = await authMiddleware.generateJwtToken(userId,0)

        res.status(410).send({"code":410,"message":"추가정보 미등록","token":token})
    }
}

exports.signup = async(req,res)=>{

  console.log(req.headers)
    try{
    decoded =await jwt.verify(req.headers.auth, process.env.secret)
    }catch(e){
      throw new TokenError(e)
    }
    const id =decoded.userId
    const {school} = req.body
    user ={
      id: id,
      school:school
    }

    if(!school){
      throw new RegisterError(400,"잘못된 값입니다.")
    }
    const token = await authMiddleware.generateJwtToken(id,1)
    await userService.signupAdditionalInfo(user)
    res.status(201).send({code:201,message:"회원가입완료","token":token})

}
