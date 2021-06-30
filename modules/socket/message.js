exports.startWaiting = function(socket){
  socket.emit('startWaiting')
}

exports.waiting = function(socket){
  socket.emit('waiting',{userName:socket.userName})
}


exports.broadcastEnterRoom = function(socket,io){
    io.to(socket.room.name).emit("enterRoomOpponent",{userName:socket.userName})
}

exports.enterRoom = function(socket){
  socket.emit("enterRoomMy",{
    userName:socket.userName,
    roomName:socket.room.name
  })
}

exports.answerNotify = function(socket,round,isAnswer){
  socket.emit('answerNotify',{
    round:round,
    isAnswer:isAnswer
  })
}


exports.broadcastAnswerNotify = function(socket,userName,round,isAnswer){
  socket.broadcast.to(socket.room.name).emit('broadcastAnswerNotify',{
    userName: userName,
    isAnswer : isAnswer,
    round: round
  });
}

exports.printMultipleChoiceQuestions = function(socket,multipleChoiceQuestions){
  socket.emit('printMultipleChoiceQuestions', {
    multipleChoiceQuestions:multipleChoiceQuestions
  });
}

exports.broadcastQuestion = function(io,roomName,questionMsg){
  io.to(roomName).emit('printQuestion', questionMsg)
}


exports.roundResultNotify =  function(socket,roundCount){
    socket.emit('roundResultNotify',{roundCount:roundCount})
}

exports.roundLoseNotify =  function(socket,roundCount){
  socket.broadcast.to(socket.room.name).emit('roundLoseNotify',{isWin:false,roundCount:roundCount})
}

