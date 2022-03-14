exports.startWaiting = function(socket){
  socket.emit('startWaiting')
}

exports.waiting = function(socket){
  socket.emit('waiting',{userName:socket.userName})
}


exports.broadcastEnterRoom = function(socket,io){
    io.to(socket.room.id).emit("enterRoomOpponent",{userName:socket.userName})
}


exports.broadcastOpponentEnterRoom = function(socket,io){
    let room = socket.room
    let roomId = room.id
    let players = room.sockets
    for ( player of players){
      player.broadcast.to(roomId).emit('enterRoomOpponent',{
      userName:player.userName,
      userId:player.userId,
      userImg:player.userImg
    })
  }
}


exports.enterRoom = function(socket){
  socket.emit("enterRoomMy",{
    userName:socket.userName,
    roomId:socket.room.id
  })
}

exports.answerNotify = function(socket,round,isAnswer){
  socket.emit('answerNotify',{
    round:round,
    isAnswer:isAnswer
  })
}


exports.broadcastAnswerNotify = function(socket,roomId,isAnswer){
    socket.broadcast.to(roomId).emit('broadcastAnswerNotify',{
    isAnswer : isAnswer,
  });
}


exports.broadcastQuestion = function(io,roomId,questionMsg){
  // console.log("questionMsg:",questionMsg)
  io.to(roomId).emit('printQuestion', questionMsg)
}


exports.roundResultNotify = function(socket,isWin){
  if(socket.room!=null)
    socket.broadcast.to(socket.room.id).emit("roundResultNotify",{isWin:!isWin})
}

exports.gameResultNotify = function(socket){
  socket.broadcast.to(socket.room.id).emit('gameResultNotify',{isWin:false})
}

exports.recordSuccessNotify = function(io,roomId){
  io.to(roomId).emit('recordSuccessNotify')
}
