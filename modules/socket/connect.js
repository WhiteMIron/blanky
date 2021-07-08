const constants = require("../../consts_folder/socket/constants")

exports.disconnect = function(socket,io,waitingClients){
    socket.on('disconnect',async function(){
       // console.log("연결 끊김")
       if(socket.room == null){
        // console.log("Disconnect: ", socket.userName)

        for (i in waitingClients) {
          if (waitingClients[i].userId == socket.userId) {
            waitingClients.splice(i, 1)
          }
        }

       }

       else{
        let room = socket.room
        let roomId = room.id
        let players = room.sockets
        for ( player of players){
          if( player !=socket && room.status!=constants.play){
            player.emit("disconnectedOpponent")
            // console.log("방 떠남")
            player.leave(roomId)
            player.room=null
          }
          else if(player !=socket && room.status==constants.play){
           player.emit("disconnectedOpponentWhilePlay",{userName:player.userName})
           // console.log("플레이중 방 떠남",player.userId)
           player.room=null
  
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
