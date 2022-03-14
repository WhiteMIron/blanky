const constants = require("../../consts_folder/socket/constants")

exports.disconnect = function(socket,io,waitingClients){
    socket.on('disconnect',async function(){
       clearTimeout(socket.timeId)
       if(socket.room == null ){
        socket.status = constants.exit
        // console.log("Disconnect: ", socket.userName)
        for (i in waitingClients) {
          n=i
          n++
          if (waitingClients[i].userId == socket.userId) {
            // console.log("연결 끊김",socket.userName)
//            socket.status = constants.exit
            waitingClients.splice(i, 1)
          }
        }

       }
       else if( socket.status == constants.end){
         // console.log("플레이 끝남")
         leaveRoom(socket)
       }

       else if(socket.room !=null){
        let room = socket.room
        let roomId = room.id
        let players = room.sockets
        for ( player of players){
          if(player !=socket){
            player.emit("disconnectedOpponentWhilePlay")
            // console.log("플레이중 방 떠남",socket.userName)
            player.status = constants.end
         }
        }
      }
    })

    socket.on("kick",function(){
      console.log("강퇴하였습니다.","강퇴한 사람:",socket.userName)
      let room = socket.room
      let roomId = room.id
      let players = room.sockets
      for(player of players)
        if( player !=socket){
          console.log("playerName:",player.userName)
          player.leave(roomId)
          player.room=null
          player.emit('kicked')
        }
    })
}



function leaveRoom(socket){
    let roomId = socket.room.id
    socket.leave(roomId)
    socket.room = null
    socket.status = constants.end
}
