const jwt =require('jsonwebtoken')
const request = require('request-promise');
const TokenError = require('../error/token-error');
require("dotenv").config()

const BASIC_KAKAO_AUTH_URL ="https://kauth.kakao.com/"
const BASIC_KAKAO_API_URL = "https://kapi.kakao.com"
const REST_API_KEY =process.env.REST_API_KEY
const REDIRECT_URI =process.env.REDIECT_URI


exports.getKakaoToken = async(code)=>{

    var options ={
        uri: BASIC_KAKAO_AUTH_URL+'oauth/token',
        method:"POST",
        form:{

            grant_type :"authorization_code",
            client_id : REST_API_KEY,
            redirect_uri : REDIRECT_URI,
            code: code
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
    }

    const body= await request(options)

    const token_json = JSON.parse(body)
    const accessToken = token_json.access_token
    const refreshToken = token_json.refresh_token
    var token ={
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    return token
}

exports.getKakaoProfile = async (accessToken)=>{
    var options={
        uri:BASIC_KAKAO_API_URL+"/v2/user/me",
        method:"POST",

        headers:{
            Authorization: "Bearer " +accessToken,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }

    const body = await request(options)

    const profile_json  = JSON.parse(body)
    const kakao_account = profile_json.kakao_account

    let id = profile_json.id
    let name = kakao_account.profile.nickname
    let email =' '
    let profileImg = kakao_account.profile.profile_image_url

    console.log(kakao_account.email_needs_agreement)
    console.log(typeof(kakao_account.email_needs_agreement))
    if(kakao_account.email_needs_agreement==false){
      email = kakao_account.email
    }


    let profile ={
        id:id,
        name:name,
        email:email,
        profileImg:profileImg
    }
    console.log(profile)
    return profile
}

exports.generateJwtToken= async (userId,verify)=>{
    var token =await
    jwt.sign({
        userId,
        verify
      },process.env.secret, {
        expiresIn: '60d',
        issuer: 'blanky',
      });

    return token
}

exports.verifyToken =async (req, res, next) => {

      try{
        req.decoded =await jwt.verify(req.headers.auth, process.env.secret)
        if(req.decoded.verify==0){
          throw new TokenError("VerifyError")
        }
          return next();
      }catch(error){
        if(error.name =="TokenExpiredError")
          throw new TokenError("TokenExpiredError")
        else
          throw new TokenError()
      }
  }


  