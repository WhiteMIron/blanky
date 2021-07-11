const CustomError = require('./custom-error')
const RegisterError = require('./register-error')
const TokenError = require('./token-error')

module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log("CustomError:",err.message)
    return res.status(err.code).json({code:err.code,message:err.message})
  }

  else if (err instanceof RegisterError){
    console.log("RegisterError:",err.message)
    return res.status(err.code).json({code:err.code,message:err.message,token:err.token})
  }
  else if (err instanceof TokenError){
    console.log("TokenError:",err.message)
    return res.status(err.code).json({code:err.code,message:err.message})
  }

 console.log(err.message)

    //내부 서버 오류
  return res.status("500").send({"code":err.code,"message":err.message})
}
