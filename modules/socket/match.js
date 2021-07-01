const constants = require("../../consts_folder/socket/constants")
const messageModule = require("./message")

exports.match =  function(socket,io,waitingClients, rooms){
   socket.on('enterNameSpace',  function(data) {
      setPlayerInfo(socket,waitingClients,data.userId,data.userName)
      searchPlayer(socket,io,waitingClients,rooms)
    })
 }

function setPlayerInfo(socket,waitingClients, userId, userName){
  socket.userId = userId
  socket.userName = userName
  socket.status = constants.waiting
  socket.room = null
  socket.winCount =0
  socket.matchHistoryId = null
  socket.roundHistoryId = null
  socket.rightAnswerDict={}
  socket.wrongAnswerDict={}
  waitingClients.push(socket)
}

async function searchPlayer(socket,io,waitingClients,rooms){

  for (i in waitingClients){
     opponent = waitingClients[i]
     let userId =  socket.userId
     if( opponent.userId == userId){
       messageModule.waiting(socket)
     }
     else if(opponent.status == constants.waiting){
       let roomId = opponent.userId
       let room = createRoom(roomId)

       joinRoom(opponent,room)
       joinRoom(socket,room)
       addRoom(rooms,room)

       removeWaitingClients(i,waitingClients,socket)
       messageModule.broadcastEnterRoom(socket,io)
    }
   }
 }

function removeWaitingClients(opponentWatingIndex, waitingClients, socket) {
  waitingClients.splice(opponentWatingIndex, 1) //상대방 제외

  for (i in waitingClients) {
    if (waitingClients[i].userId == socket.userId) {
      waitingClients.splice(i, 1)
    }
  }
}

function joinRoom(socket,room){
  socket.join(room.id)
  socket.status = constants.matched
  socket.room = room
  socket.room.sockets.push(socket)
  messageModule.enterRoom(socket)
}

function createRoom(roomId){
  let room ={
    id: roomId,
    sockets: [],
    status : constants.wait, // ready, play
    readyPlayers : [],
    round :{
      count :1,
      questionParagraph:""
    }
  }
  return room
}

function addRoom (rooms,room){
  rooms.push(room)
}
