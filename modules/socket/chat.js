exports.chat = function(socket, io) {

  socket.on('chat', function(data) {

   if(socket.room !=null){
    let roomName = socket.room.name
    let chatMsg = {
      userName: socket.userName,
      roomName: roomName,
      msg: data.msg
    }
    socket.emit('myChat', chatMsg)
    socket.broadcast.to(roomName).emit('broadcastChat', chatMsg)
    }
    else{

      chatMsg = {
        userName: socket.userName,
        roomName: "",
        msg: data.msg
      }
      socket.emit('myChat',chatMsg)
    }
  })

}
