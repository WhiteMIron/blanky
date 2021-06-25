const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const upper = io.of('/upper');//난이도 상
const middle = io.of('/middle');//난이도 중
const lower = io.of('/lower');//난이도 하

const quizRouter = require("./routes/api/quiz")

var answer = 0;

app.use("/quiz",quizRouter)

var upperWaitingClients =[]
var middleWaitingClients =[]
var lowerWaitingClients = []

var upperRooms =[]
var middleRooms =[]
var lowerRooms =[]



upper.on('connection', function(socket) {

   require("./modules/socket/match.js").match(socket,upper,upperWaitingClients,upperRooms)
   require("./modules/socket/chat.js").chat(socket)
   require("./modules/socket/play.js").play(socket,upper,upperRooms)
   require("./modules/socket/connect.js").disconnect(socket,upper)
 
   socket.on('CH01', function (from, msg) {
    // console.log('MSG', from, ' saying ', msg);
    socket.emit('CH02',{msg:"hihi"})
  })

})
server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});
