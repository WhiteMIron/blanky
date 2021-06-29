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

exports.answerNotify = function(socket,round,score,isAnswer){
  socket.emit('answerNotify',{
    round:round,
    score:score,
    isAnswer:isAnswer
  })
}


exports.broadcastAnswerNotify = function(socket,userName,round,score,isAnswer){
  socket.broadcast.to(socket.room.name).emit('broadcastAnswerNotify',{
    userName: userName,
    isAnswer : isAnswer,
    round: round,
    score: score
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
