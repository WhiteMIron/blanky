require("dotenv").config()

const express=  require("express")
const app = express()
const morgan = require("morgan")('combined')
const errorHandler = require("./error/error-handler")
const CustomError = require("./error/custum-error")
const { swaggerUi, specs } = require('./modules/swagger')

var indexRouter = require("./routes/index")
var testRouter = require("./routes/test")
var apiRouter = require("./routes/api/")

// app.use(morgan)


app.set('jwt-secret',process.env.secret)

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use("/",indexRouter)
app.use("/test",testRouter)
app.use("/api",apiRouter)
app.get('*', function(req, res, next) {
    var error = new CustomError()
    error.code = 404;
    error.message ="not found!"
    next(error)
  })

app.use(errorHandler)


var port =process.env.PORT
app.listen(port,function(){

    console.log("port:",port,"Linstening...")
})
