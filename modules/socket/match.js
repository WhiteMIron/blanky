const constants = require("../../consts_folder/socket/constants")
const messageModule = require("./message")

exports.match =  function(socket,io,waitingClients, rooms){
   socket.on('enterNameSpace',  function(data) {
      setPlayerInfo(socket,waitingClients,data.userName)
      searchPlayer(socket,io,waitingClients,rooms)
   })
 }

function setPlayerInfo(socket,waitingClients,userName){
  socket.userName = userName
  socket.status = constants.waiting
  socket.room = null
  socket.matchHistoryId = null
  socket.roundHistoryId = null
  //startIndex : wordLength
  socket.rightAnswerDict={}
  socket.wrongAnswerDict={}
  waitingClients.push(socket)
}

async function searchPlayer(socket,io,waitingClients,rooms){

  for (i in waitingClients){
     opponent = waitingClients[i]
     let userName =  socket.userName
     if( opponent.userName == socket.userName){

     messageModule.waiting(socket)
    }
     else if(opponent.status == constants.waiting){
       let roomName = opponent.userName
       let room = createRoom(roomName)

       joinRoom(opponent,room)
       joinRoom(socket,room)
       addRoom(rooms,room)

       removeWaitingClients(i,waitingClients,socket)
       messageModule.broadcastEnterRoom(socket,io)
    }
   }
 }

function removeWaitingClients(opponentWaingIndex, waitingClients, socket) {
  waitingClients.splice(opponentWaingIndex, 1) //상대방 제외

  for (i in waitingClients) {
    if (waitingClients[i].userName == socket.userName) {
      waitingClients.splice(i, 1)
    }
  }
}

function joinRoom(socket,room){
  socket.join(room.name)
  socket.status = constants.matched
  socket.room = room
  socket.room.sockets.push(socket)
  messageModule.enterRoom(socket)
}

function createRoom(roomName){
  let room ={
    name: roomName,
    sockets: [],
    status : constants.wait, // ready, play
    readyPlayers : [],
    // round: 1
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
