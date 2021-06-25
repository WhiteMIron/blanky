class RegisterError extends Error{
    constructor(code, message, token,...params) {
      super(...params)
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RegisterError)
      }
  
      this.code = code
      this.message = message
      this.token =token
     }
  }

  module.exports =RegisterError