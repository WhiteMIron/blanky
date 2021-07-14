const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const easy = io.of('/easy');//난이도 하
const normal = io.of('/normal');//난이도 중
const hard = io.of('/hard');//난이도 상

const quizRouter = require("./routes/api/quiz")
const constants = require("./consts_folder/constants")
var answer = 0;

app.use("/quiz",quizRouter)

var hardWaitingClients =[]
var normalWaitingClients =[]
var easyWaitingClients = []


easy.on('connection', function(socket) {
  require("./modules/socket/match.js").match(socket,easy,hardWaitingClients)
  require("./modules/socket/chat.js").chat(socket)
  require("./modules/socket/play.js").play(socket,easy,constants.easyMaxBlank,constants.easyMode)
  require("./modules/socket/connect.js").disconnect(socket,easy,hardWaitingClients)
})

normal.on('connection', function(socket) {
  require("./modules/socket/match.js").match(socket,normal,normalWaitingClients)
  require("./modules/socket/chat.js").chat(socket)
  require("./modules/socket/play.js").play(socket,normal,constants.normalMaxBlank,constants.normalMode)
  require("./modules/socket/connect.js").disconnect(socket,normal,normalWaitingClients)
})


hard.on('connection', function(socket) {
  require("./modules/socket/match.js").match(socket,hard,easyWaitingClients)
  require("./modules/socket/chat.js").chat(socket)
  require("./modules/socket/play.js").play(socket,hard,constants.hardMaxBlank,constants.hardMode)
  require("./modules/socket/connect.js").disconnect(socket,hard,easyWaitingClients)
})

server.listen(4000, function() {

  console.log('Socket IO server listening on port 4000');
})