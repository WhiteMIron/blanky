  const constants = require("../../consts_folder/socket/constants")
  const messageModule = require("./message")
  const _ = require("lodash");
  // var interval = null
  exports.match =  function(socket,io,waitingClients){
     socket.on('enterNameSpace',   function(data) {
      console.log(data.userId,data.userName,"score:",data.userScore,data.userImg)
      setPlayerInfo(socket,waitingClients,data.userId,data.userName,data.userScore,data.userImg)
      if(waitingClients.length>2)
        shuffle(waitingClients) //무작위로 셔플시키고
      messageModule.waiting(socket)
      startSearchClock(2000,socket,io,waitingClients)
     })
 }

  function startSearchClock(waitingTime,socket,io,waitingClients){
    socket.timeId = setTimeout (startSearchClock,waitingTime,waitingTime,socket,io,waitingClients)
    searchPlayer(socket,io,waitingClients)
  }

  function setPlayerInfo(socket,waitingClients, userId, userName,userScore,userImg){
    socket.userId = userId
    socket.userName = userName
    socket.userScore = userScore
    socket.userImg = userImg
    socket.status = constants.waiting
    socket.room = null
    socket.winCount =0
    socket.matchDate = null
    socket.matchHistoryId = null
    socket.roundHistoryId = null
    socket.currentSearchScoreDiff =  constants.currentSearchScoreDiff
    socket.rightAnswerInfos=[]
    socket.wrongAnswerInfos=[]
    waitingClients.push(socket)
  }

  function searchPlayer(socket,io,waitingClients){
    try{
        // console.log("userScore:",socket.userScore)
        let searchMaxScore =  constants.addSearchMaxScore
        let currentSearchScoreDiff = socket.currentSearchScoreDiff

        console.log("서치 중 userName:",socket.userName,"searchMaxScore:",searchMaxScore,"currentSearchScoreDiff:",socket.currentSearchScoreDiff)
        // console.log([socket.userName],"상태:", socket.status)

        if(waitingClients.length>1 && socket.status == constants.wait){
          for( i in waitingClients){
            if(waitingClients[i] == socket)
               continue;
            else if(waitingClients[i] != socket && waitingClients[i].status == constants.wait &&socket.status==constants.wait){ //상대유저란 거니깐
            // else if(waitingClients[i].userId != socket.userId && waitingClients[i].status == constants.wait &&socket.status==constants.wait){ //상대유저란 거니깐

              let opponent = waitingClients[i]
              let userId =  socket.userId
              let scoreDiff=Math.abs(socket.userScore-opponent.userScore)
              console.log("scoreDiff:",scoreDiff)

              if(scoreDiff < currentSearchScoreDiff || scoreDiff == currentSearchScoreDiff){
                let roomId = opponent.userId
                let room = createRoom(roomId)
                // clearInterval(socket.interval)
                // clearInterval(opponent.interval)
                clearTimeout(opponent.timeId)
                clearTimeout(socket.timeId)
                console.log("일반서치 매칭!")
                // console.log("매칭!","socketStatus:",socket.status,"opponentStatus:",opponent.status,"scoreDiff:",scoreDiff)
                // console.log("socketUserName:",socket.userName,"socketUserId:",socket.userId , "opponentUserName:",opponent.userName,"opponentUserId:",opponent.userId, "roomId:",roomId,"매칭 됨")
                joinRoom(opponent,room)
                joinRoom(socket,room)
                removeWaitingClients(i,waitingClients,socket)
                // messageModule.broadcastEnterRoom(socket,io)
                messageModule.broadcastOpponentEnterRoom(socket,io)
                break
              }
            }
          }
          if(socket.status == constants.waiting){
            console.log("추가 서치")
            socket.currentSearchScoreDiff += constants.addDiffScore
            if(socket.currentSearchScoreDiff >searchMaxScore){
              console.log("상태 변경:",socket.status, socket.userName)
              socket.status = constants.expiredSearch
            }
          }
       }
       else if( socket.status == constants.expiredSearch){
          clearTimeout(socket.timeId)
          if(waitingClients.length>2)
           waitingClients=quickSort(socket.userScore,waitingClients)
          for( i in waitingClients){

            if(waitingClients[i] != socket && waitingClients[i].status != constants.exit && socket.status == constants.expiredSearch && (waitingClients[i].status ==  constants.waiting || waitingClients[i].status ==  constants.expiredSearch)){
            // if(waitingClients[i].userId != socket.userId && waitingClients[i].status != constants.exit && socket.status == constants.expiredSearch && (waitingClients[i].status ==  constants.waiting || waitingClients[i].status ==  constants.expiredSearch)){
              let opponent = waitingClients[i]
              let roomId = opponent.userId
              let room = createRoom(roomId)
              let scoreDiff=Math.abs(socket.userScore-opponent.userScore)

              clearTimeout(opponent.timeId)
              clearTimeout(socket.timeId)
              console.log("expiredSearch 매칭!")
              // console.log("expiredSearch 매칭!","socketStatus:",socket.status,"opponentStatus:",opponent.status,"scoreDiff:",scoreDiff)
              // console.log("socketUserName:",socket.userName,"socketUserId:",socket.userId , "opponentUserName:",opponent.userName,"opponentUserId:",opponent.userId, "roomId:",roomId,"매칭 됨")
              joinRoom(opponent,room)
              joinRoom(socket,room)
              removeWaitingClients(i,waitingClients,socket)
              messageModule.broadcastOpponentEnterRoom(socket,io)
              break
            }
          }
       }
       else if(socket.status == constants.exit){
          clearTimeout(socket.timeId)
        }

      }catch(e){
        console.log("에러:",e)
    }
  }

  function removeWaitingClients(opponentWaitingIndex, waitingClients, socket) {
    waitingClients.splice(opponentWaitingIndex, 1) //상대방 제외
    let index = waitingClients.indexOf(socket)
    waitingClients.splice(index, 1)
  }

  function joinRoom(socket,room){
    // console.log("방 참가",socket.userName)
    socket.join(room.id)
    socket.status = constants.matched
    socket.room = room
    socket.room.sockets.push(socket)
    // messageModule.enterRoom(socket)
  }

  function createRoom(roomId){
    let room ={
      id: roomId,
      sockets: [],
      status : constants.wait, // ready, play
      readyPlayers : [],
      round :{
        count :1, //이것도 카운트 할 필요 x
        questionParagraph:null,
        questionTranslation:null
      }
    }
    return room
  }


  function randomNumRangeListLen(socket,waitingClients){
      let index=list.indexOf(socket)
      let tmpList =  _.cloneDeep(waitingClients)
      let arr = []
      console.log("watingClients길이:",watingClients.length)
      tmpList.splice(index,1) // socket 제거  깊은 복사로
      for(item of tmpList){
        arr.push(item)
      }
      console.log("tmpList길이:",tmpList.length)
      randomNum = Math.floor(Math.random() * list.length)
      return arr[randomNum]
      // returm Math.floor(Math.random() * list.length)
  }


  function shuffle(array){
    for(let index = array.length -1; index>0; index--){
        const randomPosition = Math.floor(Math.random()* (index+1));

        const temporary  = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
      }
  }


  function quickSort (score,array, left = 0, right = array.length - 1) {
    if (left >= right) {
      return;
    }
    if(array.length==undefined)
      return;
    console.log("array.length:",array.length)
    const mid = Math.floor((left + right) / 2);
    const pivot = Math.abs(score-array[mid].userScore);
    const partition = divide(array, left, right, pivot);
    quickSort(array, left, partition - 1);
    quickSort(array, partition, right);

    function divide (array, left, right, pivot) {

      while (left <= right) {
        while (Math.abs(score-array[left].userScore) < pivot) {
        left++;
        }
        while (Math.abs(score-array[right].userScore)> pivot) {
          right--;
        }
        if (left <= right) {
          let swap = array[left];
          array[left] = array[right];
          array[right] = swap;
          left++;
          right--;
        }
      }
        return left;
      }
    return array;
  }
