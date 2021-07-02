const { error } = require("winston")

class TokenError extends Error{
    constructor(errorname,...params) {
      super(...params)

      console.log("errorname",errorname)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, TokenError)
      }


      if(errorname == 'VerifyError'){
          this.code = 410
          this.message ="추가정보 미등록"
      }

      else if (errorname == 'TokenExpiredError'){
          this.code = 419
          this.message = "토큰이 만료되었습니다."

      }
      else {
          this.code = 401
          this.message = "유효하지 않은 토큰입니다."
      }
     }
  }

  module.exports =TokenError
