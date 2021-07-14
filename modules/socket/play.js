const constants = require("../../consts_folder/socket/constants")
const questionModule = require("../quiz/question")
const messageModule = require("./message")
const matchService = require("../../services/match_history")
const userService = require("../../services/user")
const moment = require("moment")
const { upperWinnerScore, upperLoserScore } = require("../../consts_folder/socket/constants")
const _ = require('lodash');


exports.play = function(socket, io,maxBlank,difficulty) {
    socket.on('start', async function() {
    if (socket.status == constants.matched) {
      let room = socket.room
      checkReadyPlayer(room,socket)
      let roomStatus = isReadyRoom(room, socket)
      if (roomStatus == constants.ready) {
        try {
          setPlayStatusRoom(room)

          let matchDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          let matchHistoryId = null
          let roomId = room.id

          for(player of room.sockets){
            if(socket==player){
              userId = player.userId
              socket.matchDate = matchDate
            }
            else{
              opponentUserId = player.userId
              player.matchDate = matchDate
            }
          }


          matchHistoryId=await matchService.recordTestMatchHistory(matchDate, userId, opponentUserId)
          for(player of room.sockets){
            player.matchHistoryId = matchHistoryId
          }

          //room에 라운드 수만큼 문장/해석 셋팅   room, difficulty, roundCount
          await questionModule.setParagraphs(room,difficulty,3)
          let questionMsg = await questionModule.createQuestion(room,room.questionParagraphs,room.questionTranslations,maxBlank)
          let round = room.round
          sendQuestion(io, roomId, questionMsg)
          console.log("문제출제")
          round.questionParagraph = questionMsg.questionParagraph
        } catch (error) {
          msg = {
            code: 400,
            msg: "문제 전송 실패"
          }
          io.to(room.id).emit('errorPrintQuestion', msg);
        }
      }
      else
          messageModule.startWaiting(socket)
    }
  })


 socket.on('broadcastAnswerNotify',async function(data){
    let roomId = socket.room.id
    if(data.isAnswer == true)
      messageModule.broadcastAnswerNotify (socket,roomId,true)
    else
      messageModule.broadcastAnswerNotify (socket,roomId,false)

  })


  socket.on('answer', async function(data) {

    let rightAnswer = data.word
    let isAnswer = data.isAnswer
    let startIndex = data.startIndex
    let endIndex = data.endIndex

    let room = socket.room
    let roomId = room.id
    let rightAnswerInfos = socket.rightAnswerInfos
    let wrongAnswerInfos = socket.wrongAnswerInfos
    console.log("id:",socket.room.id)


    if (isAnswer == true) {
        messageModule.broadcastAnswerNotify (socket,roomId,true)
        isExists=_.findIndex(wrongAnswerInfos, { 'word': rightAnswer})
        if(isExists==constants.notExists){
            rightAnswerInfos.push(
              answerInfo = {
                startIndex: startIndex,
                endIndex : endIndex,
                word : rightAnswer
              }
            )
        }
    }
    else if(isAnswer==false){
      messageModule.broadcastAnswerNotify (socket,roomId,false)

      isExists=_.findIndex(wrongAnswerInfos, { 'word': rightAnswer})
          console.log("isExists:",isExists,"constants.notExists:",constants.notExists)
          if(isExists==constants.notExists)
            wrongAnswerInfos.push(
              answerInfo = {
                startIndex: startIndex,
                endIndex : endIndex,
                word : rightAnswer
              }
            )
      }
      console.log("rightAnswerInfos:",rightAnswerInfos)
      console.log("wrongAnswerInfos:",wrongAnswerInfos)

  })

    socket.on('notifyRoundResult',async function(data){
      let isWin =data.isWin
      messageModule.roundResultNotify(socket,isWin)
    })


    socket.on('recordRoundResult',async function(data){
      let isWin = data.isWin

      let room = socket.room
      let round = room.round
      let roundCount = round.count
      let roundQuestionParagraph = round.questionParagraph
      let matchHistoryId = socket.matchHistoryId
      let positions = data.positions
      let userId = socket.userId
      let rightAnswerInfos = socket.rightAnswerInfos
      let wrongAnswerInfos = socket.wrongAnswerInfos
      let matchDate = socket.matchDate

      for(position of positions){
        let rightAnswer = position.word
        let startIndex = position.startIndex
        let endIndex = position.endIndex

        wrongAnswerInfos.push(
          answerInfo = {
            startIndex: startIndex,
            endIndex : endIndex,
            word : rightAnswer
            })
      }

      rightAnswerInfos = rightAnswerInfos
      wrongAnswerInfos = wrongAnswerInfos


      if(isWin == true){

        await matchService.recordTestMatchResultHistory(matchHistoryId,userId)
        roundHistoryId=await matchService.recordTestRoundHistory(roundCount,roundQuestionParagraph,constants.win,userId,matchHistoryId)
        await matchService.recordScoreHistory(matchDate,upperWinnerScore,userId)
        await userService.changeUserScore(userId,constants.upperWinnerScore)
      }
      else if(isWin == false){
          roundHistoryId=await matchService.recordTestRoundHistory(roundCount,roundQuestionParagraph,constants.lose,userId,matchHistoryId)
          await matchService.recordScoreHistory(matchDate,upperLoserScore,socket.userId)
          await userService.changeUserScore(userId,constants.upperLoserScore)
      }

      for(info of rightAnswerInfos)
        await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.right,roundHistoryId,info.word)
      for(info of wrongAnswerInfos)
        await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.wrong,roundHistoryId,info.word)

      socket.rightAnswerInfos=[]
      socket.wrongAnswerInfos=[]
    })

 //진쪽에서 이벤트 발생
 socket.on("submitQuestion",async function(){
  let room = socket.room
  let questionMsg = await questionModule.createQuestion(room,room.questionParagraphs,room.questionTranslations,maxBlank)
  let round = room.round
  let roomId=  room.id
  sendQuestion(io, roomId, questionMsg)
  round.questionParagraph = questionMsg.questionParagraph
  console.log("문제출제")

  })

  //이긴쪽에서 먼저 이벤트 발생
  socket.on("finish",async function(data){
    //여기에서 각자 맞춘갯수 / 틀린 갯수 정보를 상대에게 전달
    if(isWin==true){
      let matchHistoryId = socket.matchHistoryId
      let winnerId = socket.id
      await matchService.recordTestMatchResultHistory(matchHistoryId,winnerId)
    }

    messageModule.gameResultNotify(socket,room)
  })

  socket.on("sendAnswerResult",function(data){
    messageModule.gameResultNotify(socket,room)
  })

  //진쪽에서 이벤트 발생
  socket.on("leave",function(data){
    leaveRoom(room)
  })

}




function checkReadyPlayer(room,socket){
  if(room.readyPlayers.indexOf(socket) ==-1)
    room.readyPlayers.push(socket)
}


function isReadyRoom(room, socket) {
    if (room.readyPlayers.length == 2){
      room.status = constants.ready
      return constants.ready
    }
  else
    return constants.wait
}


function sendQuestion(io,roomId,questionMsg){
  messageModule.broadcastQuestion(io,roomId,questionMsg)
}



function setPlayStatusRoom(room){
  room.readyPlayers.splice(0,room.readyPlayers.length)
  room.status = constants.play
}

function leaveRoom(room){
  let players = room.sockets
  for( player of players){
    player.leave(room.id)
    player.room = null
    player.emit("leaveRoom")
  }

}
