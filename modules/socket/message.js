exports.startWaiting = function(socket){
  socket.emit('startWaiting')
}

exports.waiting = function(socket){
  socket.emit('waiting',{userName:socket.userName})
}


exports.broadcastEnterRoom = function(socket,io){
    io.to(socket.room.id).emit("enterRoomOpponent",{userName:socket.userName})
}

exports.enterRoom = function(socket){
  socket.emit("enterRoomMy",{
    userName:socket.userName,
    roomId:socket.room.id
  })
}


exports.broadcastAnswerNotify  = function(socket,roomId,isAnswer){
    console.log("broadcastAnswerNotify 발생",isAnswer)
    socket.broadcast.to(roomId).emit('broadcastAnswerNotify',{
    isAnswer:isAnswer
  })
}



exports.broadcastQuestion = function(io,roomId,questionMsg){
  io.to(roomId).emit('printQuestion', questionMsg)
}

exports.roundLoseNotify =  function(socket){
  socket.broadcast.to(socket.room.id).emit('roundLoseNotify')
}

//상대방에게 자신이 맞춘/틀린 단어 갯수 보내기
exports.gameResultNotify = function(socket,room){
  socket.broadcast.to(socket.room.id).emit('gameResultNotify',{rightAnswerCount:socket.rightAnswerCount, wrongAnswerCount:socket.wrongAnswerCount})
}
