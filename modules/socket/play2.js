const constants = require("../../consts_folder/socket/constants")
const questionModule = require("../quiz/question2")
const messageModule = require("./message")
const matchService = require("../../services/match_history")
const userService = require("../../services/user")
const moment = require("moment")
const { upperWinnerScore, upperLoserScore } = require("../../consts_folder/socket/constants")
const _ = require('lodash');


exports.play = function(socket, io,maxBlank,difficulty,minLength,winnerScore,loserScore) {

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
          room.matchDate = matchDate

          await questionModule.setParagraphs(room,difficulty,7)
          let round = room.round
          let roundCount = round.count
          let questionMsg = await questionModule.createQuestion(room,room.questionParagraphs,room.questionTranslations,maxBlank,minLength,roundCount)
          sendQuestion(io, roomId, questionMsg)
          // console.log("문제출제")

          initAnswerInfos(room.sockets,roundCount)
          // setRoundQuestion(round,questionMsg.questionParagraph, questionMsg.questionTranslation)
          // round.questionParagraph = questionMsg.questionParagraph
          // round.questionTranslation = questionMsg.questionTranslation

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
    let roundCount  = room.round.count
    let roundAnswerInfos = socket.roundAnswerInfos
    let rightAnswerInfos = roundAnswerInfos[roundCount-1].rightAnswerInfos
    let wrongAnswerInfos = roundAnswerInfos[roundCount-1].wrongAnswerInfos

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
      if(isExists==constants.notExists)
          wrongAnswerInfos.push(
            answerInfo = {
              startIndex: startIndex,
              endIndex : endIndex,
              word : rightAnswer
            }
          )
      }


  })

  socket.on('notifyRoundResult',async function(data){
    let isWin =data.isWin
    messageModule.roundResultNotify(socket,isWin)
  })



 //진쪽에서 이벤트 발생
 socket.on("submitQuestion",async function(){
  let room = socket.room
  let roomId = room.id

  plusRound(room)

  let roundCount = room.round.count
  let questionMsg = await questionModule.createQuestion(room,room.questionParagraphs,room.questionTranslations,maxBlank,minLength,roundCount)

  initAnswerInfos(room.sockets,roundCount)
  sendQuestion(io,roomId,questionMsg)
  // console.log("문제출제")

  })

  socket.on('recordRoundResult',async function(data){
    let isWin = data.isWin
    let room = socket.room
    let round = room.round
    let roundCount = round.count

    let positions = data.positions
    let roundAnswerInfos = socket.roundAnswerInfos
    let wrongAnswerInfos = roundAnswerInfos[roundCount-1].wrongAnswerInfos

    socket.roundResults.push(isWin)
    // console.log("userName:",socket.userName,"isWin:",isWin)

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

    // roundAnswerInfos[roundCount-1].wrongAnswerInfos = wrongAnswerInfos


  })


  socket.on("finish",async function(data){
      messageModule.gameResultNotify(socket)
      setTimeout(async function(socket,winnerScore,loserScore){

        let roundResults = socket.roundResults
        let opponent =null
        let opponentUserId = null

        let room = socket.room
        let round = room.round
        let roundCount  = round.count
        let players = room.sockets

        let matchDate = room.matchDate
        let matchHistoryId = null
        let roundAnswerInfos = null

        let userId = socket.userId
        let winnerId = socket.userId

        for(player of room.sockets){
          if(socket==player)
            userId = player.userId
          else{
              opponent = player
              opponentUserId = player.userId
            }
        }

        let opponentRoundResults = opponent.roundResults
        // console.log("roundResults",roundResults)
        // console.log("opponentRoundResults",opponentRoundResults)

        matchHistoryId=await matchService.recordMatchResultHistory(matchDate,difficulty,winnerId,userId, opponentUserId)

        for(player of players){
            if(player == socket){
              roundAnswerInfos = player.roundAnswerInfos

              for(i=0;i<roundCount;i++){
                isRoundWin = roundResults[i]
                roundQuestionParagraph = room.questionParagraphs[i]
                roundQuestionTranslation = room.questionTranslations[i]
                roundHistoryId=await matchService.recordTestRoundHistory(i+1,roundQuestionParagraph,roundQuestionTranslation,isRoundWin,userId,matchHistoryId)

                for(info of roundAnswerInfos[i].rightAnswerInfos){
                  await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.right,roundHistoryId,info.word)
                }
                for(info of roundAnswerInfos[i].wrongAnswerInfos){
                  await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.wrong,roundHistoryId,info.word)
                }
              }

              await matchService.recordScoreHistory(matchDate,winnerScore,userId)
              await userService.changeUserScore(userId,winnerScore)

            }
            else if(player != socket){
              roundAnswerInfos = player.roundAnswerInfos

              for(i=0;i<roundCount;i++){
                isRoundWin = opponentRoundResults[i]
                roundQuestionParagraph = room.questionParagraphs[i]
                roundQuestionTranslation = room.questionTranslations[i]
                roundHistoryId=await matchService.recordTestRoundHistory(i+1,roundQuestionParagraph,roundQuestionTranslation,isRoundWin,opponentUserId,matchHistoryId)

                for(info of roundAnswerInfos[i].rightAnswerInfos){
                  await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.right,roundHistoryId,info.word)
                }
                for(info of roundAnswerInfos[i].wrongAnswerInfos){
                  await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.wrong,roundHistoryId,info.word)
                }
              }
              await matchService.recordScoreHistory(matchDate,loserScore,opponentUserId)
              await userService.changeUserScore(opponentUserId,loserScore)

              socket.status  = constants.end
              opponent.status = constants.end

              messageModule.recordSuccessNotify(io,room.id)
           }
         }
      }, 2000,socket,winnerScore,loserScore);

      // let roundResults = socket.roundResults
      // let opponent =null
      // let opponentUserId = null
      //
      // let room = socket.room
      // let round = room.round
      // let roundCount  = round.count
      // let players = room.sockets
      //
      // let matchDate = room.matchDate
      // let matchHistoryId = null
      // let roundAnswerInfos = null
      //
      // let userId = socket.userId
      // let winnerId = socket.userId
      //
      //
      // for(player of room.sockets){
      //   if(socket==player)
      //     userId = player.userId
      //   else{
      //       opponent = player
      //       opponentUserId = player.userId
      //     }
      // }
      //
      // let opponentRoundResults = opponent.roundResults
      // console.log("roundResults",roundResults)
      // console.log("opponentRoundResults",opponentRoundResults)
      //
      // matchHistoryId=await matchService.recordMatchResultHistory(matchDate,difficulty,winnerId,userId, opponentUserId)
      //
      // for(player of players){
      //     if(player == socket){
      //       roundAnswerInfos = player.roundAnswerInfos
      //
      //       for(i=0;i<roundCount;i++){
      //         isRoundWin = roundResults[i]
      //         roundQuestionParagraph = room.questionParagraphs[i]
      //         roundQuestionTranslation = room.questionTranslations[i]
      //         roundHistoryId=await matchService.recordTestRoundHistory(i+1,roundQuestionParagraph,roundQuestionTranslation,isRoundWin,userId,matchHistoryId)
      //
      //         for(info of roundAnswerInfos[i].rightAnswerInfos){
      //           await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.right,roundHistoryId,info.word)
      //         }
      //         for(info of roundAnswerInfos[i].wrongAnswerInfos){
      //           await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.wrong,roundHistoryId,info.word)
      //         }
      //       }
      //
      //       await matchService.recordScoreHistory(matchDate,winnerScore,userId)
      //       await userService.changeUserScore(userId,winnerScore)
      //
      //     }
      //     else if(player != socket){
      //       roundAnswerInfos = player.roundAnswerInfos
      //
      //       for(i=0;i<roundCount;i++){
      //         isRoundWin = opponentRoundResults[i]
      //         roundQuestionParagraph = room.questionParagraphs[i]
      //         roundQuestionTranslation = room.questionTranslations[i]
      //         roundHistoryId=await matchService.recordTestRoundHistory(i+1,roundQuestionParagraph,roundQuestionTranslation,isRoundWin,opponentUserId,matchHistoryId)
      //
      //         for(info of roundAnswerInfos[i].rightAnswerInfos){
      //           await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.right,roundHistoryId,info.word)
      //         }
      //         for(info of roundAnswerInfos[i].wrongAnswerInfos){
      //           await matchService.recordTestAnswerHistory(info.startIndex,info.endIndex,constants.wrong,roundHistoryId,info.word)
      //         }
      //       }
      //       await matchService.recordScoreHistory(matchDate,loserScore,opponentUserId)
      //       await userService.changeUserScore(opponentUserId,loserScore)
      //
      //       socket.status  = constants.end
      //       opponent.status = constants.end
      //
      //       messageModule.recordSuccessNotify(io,room.id)
      //   }
      // }
  })

  socket.on("sendAnswerResult",function(data){
    messageModule.gameResultNotify(socket,room)
  })

}


function checkReadyPlayer(room,socket){
  if(room && room.readyPlayers.indexOf(socket) ==-1)
    room.readyPlayers.push(socket)
}


function isReadyRoom(room, socket) {
    if (room && room.readyPlayers.length == 2){
      room.status = constants.ready
      return constants.ready
    }
  else
    return constants.wait
}


function plusRound(room){
  room.round.count ++
}

function sendQuestion(io,roomId,questionMsg,roundCount){
  messageModule.broadcastQuestion(io,roomId,questionMsg)
}



function initAnswerInfos(players,roundCount){
  for ( player of players){
    info ={
      rightAnswerInfos:[],
      wrongAnswerInfos:[]
    }
    player.roundAnswerInfos[roundCount-1]=info
  }
}

function setPlayStatusRoom(room){
  room.readyPlayers.splice(0,room.readyPlayers.length)
  room.status = constants.play
}
