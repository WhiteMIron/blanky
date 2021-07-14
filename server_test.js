const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const upper = io.of('/upper');//난이도 상
const middle = io.of('/middle');//난이도 중
const lower = io.of('/lower');//난이도 하

const quizRouter = require("./routes/api/quiz")
const constants = require("./consts_folder/constants")
var answer = 0;

app.use("/quiz",quizRouter)

var upperWaitingClients =[]
var middleWaitingClients =[]
var lowerWaitingClients = []


upper.on('connection', function(socket) {
   require("./modules/socket/match.js").match(socket,upper,upperWaitingClients)
   require("./modules/socket/chat.js").chat(socket)
   require("./modules/socket/play.js").play(socket,upper,constants.easyMaxBlank)
   require("./modules/socket/connect.js").disconnect(socket,upper,upperWaitingClients)
})

middle.on('connection', function(socket) {
  require("./modules/socket/match.js").match(socket,middle,upperWaitingClients)
  require("./modules/socket/chat.js").chat(socket)
  require("./modules/socket/play.js").play(socket,middle,constants.normalMaxBlank)
  require("./modules/socket/connect.js").disconnect(socket,middle,middleWaitingClients)
})



lower.on('connection', function(socket) {
  require("./modules/socket/match.js").match(socket,lower,upperWaitingClients)
  require("./modules/socket/chat.js").chat(socket)
  require("./modules/socket/play.js").play(socket,lower,constants.hardMaxBlank)
  require("./modules/socket/connect.js").disconnect(socket,lower,lowerWaitingClients)
})

server.listen(4000, function() {

  console.log('Socket IO server listening on port 4000');
})