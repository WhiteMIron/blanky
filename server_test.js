const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const questionModule = require("./modules/quiz/question")
const upper = io.of('/upper');//난이도 상
const middle = io.of('/middle');//난이도 중
const lower = io.of('/lower');//난이도 하

const quizRouter = require("./routes/api/quiz")

var answer = 0;

app.use("/quiz",quizRouter)

var upperWaitingClients =[]
var middleWaitingClients =[]
var lowerWaitingClients = []

var upperRooms =[]
var middleRooms =[]
var lowerRooms =[]



upper.on('connection',async function(socket) {
    let rooms1 = upper.adapter.rooms
    for ( room1 of rooms1){
      console.log("length11:",room1)
    }
   require("./modules/socket/match.js").match(socket,upper,upperWaitingClients,upperRooms)
   require("./modules/socket/chat.js").chat(socket)
   require("./modules/socket/play.js").play(socket,upper,upperRooms)
   require("./modules/socket/connect.js").disconnect(socket,upper)


   //
   // socket.on("disconnect",function(){
   // console.log("SOCKETIO disconnect EVENT: ", socket.userName, " client disconnect");
   //
   //   for( i in upperRooms){
   //     for( client of upperRooms[i].sockets)
   //      if(client!=socket){
   //        client.emit("discWhileChat")
   //           upperWaitingClients.push(client)
   //      }
   //      upperRooms.splice(i,1)
   //   }
   //
   //   for(i in upperWaitingClients)
   //     if(upperWaitingClients[i].userName==socket.userName)
   //       upperWaitingClients.splice(i,1)
   //
   // });
       //게임방에 들어가 있던 사용자들의 상태와,방이름을 리셋
   //     if(data.msg=="leave"){
   //
   //       var test=socket.userName
   //       upper.to(data.room).emit('Leave', {test});
   //       for(var a = 0; a<clients.length;a++){
   //         if(clients[a].roomName == data.room){
   //           clients[a].client.join(clients[a].client.id);
   //           clients[a].roomName = "";
   //           clients[a].status = finding;
   //         }
   //       }
   //     }
   //   }
   // });
//
//
//   socket.on("chatEnd",function(data){
//     // console.log("chatEnd: ", data.disroom);
//     for(var a = 0; a<clients.length;a++){
//       if(clients[a].roomName == data.disroom){
//         clients[a].client.join(clients[a].client.id);
//         clients[a].roomName = "";
//         clients[a].status = finding;
//       }
//     }
//   });
// });
})
server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});
