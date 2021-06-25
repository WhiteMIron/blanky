exports.startWaiting = function(socket){
  socket.emit('startWaiting')
}

exports.waiting = function(socket){
  socket.emit('waiting',{userName:socket.userName})
}


exports.broadcastEnterRoom = function(socket,io){
    io.to(socket.room.name).emit("enterRoomOppnent",{userName:socket.userName})
}

exports.enterRoom = function(socket){
  socket.emit("enterRoomMy",{
    userName:socket.userName,
    roomName:socket.room.name
  })
}

exports.answerRight = function(socket,round,score){
  socket.emit('answerRight',{
    round:round,
    score:score
  })
}

exports.answerWrong = function(socket,round,score){
  socket.emit('answerWrong',{
    round:round,
    score:score
  })
}

exports.broadcastAnswerRight = function(socket,userName,round,score){
  socket.broadcast.to(socket.room.name).emit('broadcastAnswerRight',{
    userName: userName,
    round: round,
    score: score
  });
}

exports.broadcastAnswerWrong = function(socket,userName,round,score){
  socket.broadcast.to(socket.room.name).emit('broadcastAnswerWrong',{
    userName: userName,
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
