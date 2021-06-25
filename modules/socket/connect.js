exports.disconnect = function(socket,io){
    socket.on('disconnect',async function(){
       if(socket.room == null){
         console.log("Disconnect: ", socket.userName)
       }

       else{

         let room = socket.room
         for( socket1 of room.sockets){
            socket1.leave(room.name)
          }
        }
    })


}
