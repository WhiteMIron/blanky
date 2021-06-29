const constants = require("../../consts_folder/socket/constants")

exports.disconnect = function(socket,io){
    socket.on('disconnect',async function(){
       if(socket.room == null){
         console.log("Disconnect: ", socket.userName)
       }

       else{
        let room = socket.room
        let roomName = room.name
        let players = room.sockets
        for ( player of players){
          if( player !=socket && room.status!=constants.play){
            player.emit("disconnectedOpponent")
            player.leave(roomName)
            player.room=null
          }
          else if(player !=socket && room.status==constants.play){
            player.emit("disconnectedOpponentWhilePlay")
            player.room=null
          }
        }
      }
    })

    socket.on("kick",function(){
      console.log("강퇴하였습니다.","강퇴한 사람:",socket.userName)
      let room = socket.room
      let roomName = room.name
      let players = room.sockets
      for(player of players)
        if( player !=socket){
          console.log("playerName:",player.userName)
          player.leave(roomName)
          player.room=null
          player.emit('kicked')
        }
    })
   
}
