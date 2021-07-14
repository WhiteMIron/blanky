const constants = require("../../consts_folder/socket/constants")
const messageModule = require("./message")

exports.match =  function(socket,io,waitingClients){
   socket.on('enterNameSpace',   function(data) {
    setPlayerInfo(socket,waitingClients,data.userId,data.userName)
    messageModule.waiting(socket)
    setTimeout(searchPlayer,3000,socket,io,waitingClients)
    })
 }

function setPlayerInfo(socket,waitingClients, userId, userName){
  socket.userId = userId
  socket.userName = userName
  socket.status = constants.waiting
  socket.room = null
  socket.winCount =0
  socket.matchDate = null
  socket.matchHistoryId = null
  socket.roundHistoryId = null
  socket.rightAnswerInfos=[]
  socket.wrongAnswerInfos=[]
  waitingClients.push(socket)
}


function searchPlayer(socket,io,waitingClients){

  if(socket.status ==constants.waiting){
    while(true){
      index = randomNumRangeListLen(waitingClients)
      opponent = waitingClients[index]
      console.log("서치중",waitingClients.length)
      let userId =  socket.userId
      if(waitingClients.length==1){
          console.log("대기 1명으로 서치 중지")
          break
      }

      else if(opponent.userId != userId && opponent.status == constants.waiting){
        console.log("매칭!")
        let roomId = opponent.userId
        let room = createRoom(roomId)
        console.log("socketUserId:",socket.userId , "opponentUserId:",opponent.userId, "roomId:",roomId,"매칭 됨")
        joinRoom(opponent,room)
        joinRoom(socket,room)
        removeWaitingClients(index,waitingClients,socket)
        messageModule.broadcastEnterRoom(socket,io)

        // const rs = io.adapter.rooms;
        // console.log(rs)
        // // for ( key of rs.keys()){
          // if(rs.get(key).size<2){
          //  s = io.sockets.get(key)
          //  console.log("방에 있는 유저명:",s.userName)
          // }
        // }
        break
      }
    }
  }
}

function removeWaitingClients(opponentWaitingIndex, waitingClients, socket) {
  // console.log("제거 됨",waitingClients[opponentWaitingIndex].userName)
  waitingClients.splice(opponentWaitingIndex, 1) //상대방 제외
  for (i in waitingClients) {
    if (waitingClients[i].userId == socket.userId) {
      // console.log("제거 됨",waitingClients[i].userName)
      waitingClients.splice(i, 1)
    }
  }
}

function joinRoom(socket,room){
  // console.log("방 참가",socket.userName)
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
      count :1, //이것도 카운트 할 필요 x
      questionParagraphs:[],
      questionTranslations:[]
    }
  }
  return room
}


function randomNumRangeListLen(list){
    return randomNum = Math.floor(Math.random() * list.length)
}
