class CustomError extends Error {
    constructor(code, message, ...params) {
      super(...params)

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
      }

      this.code = code
      this.message = message

      console.log(message)
    }
  }

  module.exports = CustomError
