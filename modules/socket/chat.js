exports.chat = function(socket, io) {

  socket.on('chat', function(data) {

   if(socket.room !=null){
    let roomId = socket.room.id
    let chatMsg = {
      userName: socket.userName,
      roomId: roomId,
      msg: data.msg
    }
    socket.emit('myChat', chatMsg)
    socket.broadcast.to(roomId).emit('broadcastChat', chatMsg)
    }
    else{

      chatMsg = {
        userName: socket.userName,
        roomId: "",
        msg: data.msg
      }
      socket.emit('myChat',chatMsg)
    }
  })

}
