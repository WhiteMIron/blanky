const constants = require("../../consts_folder/socket/constants")
const questionModule = require("../quiz/question")
const checkAnswerModule = require("../quiz/check_answer")
const messageModule = require("./message")
const chatModule = require("./chat")
const matchService = require("../../services/match_history")
const userService = require("../.././services/user")
const moment = require("moment")
const { upperWinnerScore, upperLoserScore } = require("../../consts_folder/socket/constants")

exports.play = function(socket, io) {
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
          // console.log("matchHistoryId",matchHistoryId)
          for(player of room.sockets){
            player.matchHistoryId = matchHistoryId
          }

          let questionMsg = await createQuestion()
          let players = room.sockets
          let round = room.round
          sendQuestion(io, room, questionMsg)
          console.log("문제출제")
          setPlayersQuestionStatus(players, questionMsg.multipleChoiceQuestions, questionMsg.blankWords)
          round.questionParagraph = questionMsg.originalParagraph

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



 socket.on('answer', async function(data) {
      console.log(socket.userName,data)
      answer = data.answer - 1
      let rightAnswer = socket.blankWords[0]
      let result = await checkAnswerModule.isRightAnswer(answer, socket.multipleChoiceQuestions, socket.blankWords)
      let userName = socket.userName
      let room = socket.room
      let round =room.round
      let roundCount = round.count
      let blankWords = result.blankWords
      let multipleChoiceQuestions = result.multipleChoiceQuestions

      if (result.isRight == true) {
        answerPositionIndex=round.questionParagraph.indexOf(rightAnswer)
        answerLength = rightAnswer.length
        if(Object.keys(socket.wrongAnswerDict).length==0)
          socket.rightAnswerDict[answerPositionIndex] =answerLength
        else{
          for(key of Object.keys(socket.wrongAnswerDict)){
            if(answerPositionIndex!=key){
              socket.rightAnswerDict[answerPositionIndex] =answerLength
            }
          }
        }

          setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
          messageModule.answerNotify(socket,roundCount,true)
          messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
          messageModule.broadcastAnswerNotify(socket,userName,roundCount,true)
        }

      else if(result.isRight==false){

        answerPositionIndex=round.questionParagraph.indexOf(rightAnswer)
        answerLength = rightAnswer.length

        if(Object.keys(socket.wrongAnswerDict)==0)
          socket.wrongAnswerDict[answerPositionIndex] =answerLength

        for(key of Object.keys(socket.wrongAnswerDict)){
          if(key!=answerPositionIndex){
            socket.wrongAnswerDict[answerPositionIndex] =answerLength
          }
        }
        setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
        messageModule.answerNotify(socket,roundCount,false)
        messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
        messageModule.broadcastAnswerNotify(socket,userName,roundCount,false)
      }

      result=checkPlayerSolveQuestion(multipleChoiceQuestions)
      if(result==true){
          console.log("문제 다품")
          messageModule.roundResultNotify(socket,roundCount)
      }

    })

    socket.on('recordRoundResult',async function(data){
       let room = socket.room
       let players = room.sockets
       let round = socket.room.round
       let roundCount = round.count
       let roundQuestionParagraph = round.questionParagraph
       let matchHistoryId = socket.matchHistoryId
       // 상대방엔 Lose event emit
       messageModule.roundLoseNotify(socket,roundCount)

       for(player of players){
        let userId = player.userId
        let rightAnswerDict = player.rightAnswerDict
        let wrongAnswerDict = player.wrongAnswerDict
        let blankWords =player.blankWords
        let matchHistoryId =player.matchHistoryId
        let player2AttainScore = null
        for( word of blankWords){
          let rightAnswer = word
          wrongAnswerDict = player.wrongAnswerDict
          answerPositionIndex=round.questionParagraph.indexOf(rightAnswer)
          answerLength = rightAnswer.length

          if(Object.keys(player.wrongAnswerDict)==0)
            player.wrongAnswerDict[answerPositionIndex] =answerLength

          for(key of Object.keys(player.wrongAnswerDict)){
            if(key!=answerPositionIndex){
              player.wrongAnswerDict[answerPositionIndex] =answerLength
            }
          }
        }

        rightAnswerDict = player.rightAnswerDict
        wrongAnswerDict = player.wrongAnswerDict


        if( player==socket){
          plusWinCount(player)
          console.log("winId:",player.userId)
          await matchService.recordTestMatchResultHistory(matchHistoryId,player.userId)
          await userService.changeUserScore(userId,constants.upperWinnerScore)
          roundHistoryId=await matchService.recordTestRoundHistory(roundCount,roundQuestionParagraph,constants.win,player.userId,matchHistoryId)
          await matchService.recordScoreHistory(player.matchDate,upperWinnerScore,player.userId)
       }
        else{
          await userService.changeUserScore(userId,constants.upperLoserScore)
          roundHistoryId=await matchService.recordTestRoundHistory(roundCount,roundQuestionParagraph,constants.win,player.userId,matchHistoryId)
          await matchService.recordScoreHistory(player.matchDate,upperLoserScore,player.userId)
        }

        for(answerPositionIndex of Object.keys(rightAnswerDict))
          await matchService.recordTestAnswerHistory(answerPositionIndex,rightAnswerDict[answerPositionIndex],constants.right,roundHistoryId)
        for(answerPositionIndex of Object.keys(wrongAnswerDict))
          await matchService.recordTestAnswerHistory(answerPositionIndex,wrongAnswerDict[answerPositionIndex],constants.wrong,roundHistoryId)
          player.rightAnswerDict={}
          player.wrongAnswerDict={}
      }

      if(socket.winCount ==1){
        messageModule.gameResultNotify(socket)
        io.to(room.id).emit("finish")
        leaveRoom(room)
      }

      else if(roundCount<3){
        plusRound(room)
        let questionMsg = await createQuestion()
        console.log("questionMsg:",questionMsg)
        sendQuestion(io, room, questionMsg)
        let players = room.sockets
        setPlayersQuestionStatus(players, questionMsg.multipleChoiceQuestions, questionMsg.blankWords)
        round.questionParagraph = questionMsg.originalParagraph

      }
      else{
        io.to(room.id).emit("finish")
        leaveRoom(room)
      }

    })

}

function plusWinCount(player){
  player.winCount ++
}

function checkAllPlayerSolveQuestion(players){
  for(player of players){
   result =checkPlayerSolveQuestion(player.multipleChoiceQuestions)
   if(result==true)
    continue
   else
    return false
  }
  return true
}

function checkPlayerSolveQuestion(multipleChoiceQuestions){
  if(multipleChoiceQuestions.length ==0)
    return true
  else
    return false
}

function plusRound(room){
  room.round.count ++
}


function setQuestionStatus(player,multipleChoiceQuestions,blankWords){
  player.multipleChoiceQuestions = multipleChoiceQuestions
  player.blankWords = blankWords
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


async function createQuestion(){
    let question = await questionModule.createQuestion()
    let questionMsg = {
           originalParagraph: question.originalParagraph,
           question: question.paragraph,
           multipleChoiceQuestions : question.multipleChoiceQuestions,
           blankWords:question.blankWords
         }
   return questionMsg
}

function sendQuestion(io,room,questionMsg){
  let roomId = room.id
  messageModule.broadcastQuestion(io,roomId,questionMsg)
}

function setPlayersQuestionStatus (players,multipleChoiceQuestions,blankWords){
  for( player of players)
    setQuestionStatus(player,multipleChoiceQuestions,blankWords)
}

function setQuestionStatus(player,multipleChoiceQuestions,blankWords){
  player.multipleChoiceQuestions = multipleChoiceQuestions
  player.blankWords = blankWords
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


 // socket.on('answer', async function(data) {
    //   answer = data.answer - 1
    //   let rightAnswer = socket.blankWords[0]
    //   let result = await checkAnswerModule.isRightAnswer(answer, socket.multipleChoiceQuestions, socket.blankWords)
    //   let userName = socket.userName
    //   let room = socket.room
    //   let round =room.round
    //   let roundCount = round.count
    //   let roundQuestionParagraph = round.questionParagraph

    //   let blankWords = result.blankWords
    //   let multipleChoiceQuestions = result.multipleChoiceQuestions

    //   if (result.isRight == true) {
    //     answerPositionIndex=round.questionParagraph.indexOf(rightAnswer)
    //     answerLength = rightAnswer.length
    //     if(Object.keys(socket.wrongAnswerDict).length==0)
    //       socket.rightAnswerDict[answerPositionIndex] =answerLength
    //     else{
    //       for(key of Object.keys(socket.wrongAnswerDict)){
    //         if(answerPositionIndex!=key){
    //           socket.rightAnswerDict[answerPositionIndex] =answerLength
    //         }
    //       }
    //     }


    //     setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
    //     messageModule.answerNotify(socket,roundCount,true)
    //     messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
    //     messageModule.broadcastAnswerNotify(socket,userName,roundCount,true)


    //     result=checkAllPlayerSolveQuestion(room.sockets)
    //     if(result ==true){
    //       //나중에 푼 사람

    //       roundHistoryId=await matchService.recordRoundHistory(roundCount,roundQuestionParagraph,false,socket.matchHistoryId,socket.userName)
    //       for(answerPositionIndex of Object.keys(socket.rightAnswerDict))
    //         matchService.recordAnswerHistory(answerPositionIndex,socket.rightAnswerDict[answerPositionIndex],true,roundHistoryId)
    //       for(answerPositionIndex of Object.keys(socket.wrongAnswerDict)) {
    //         matchService.recordAnswerHistory(answerPositionIndex,socket.wrongAnswerDict[answerPositionIndex],false,roundHistoryId)


    //       }


    //       if(roundCount<1){
    //         //여기다 승패여부
    //         plusRound(room)
    //         let questionMsg = await createQuestion()
    //         sendQuestion(io, room, questionMsg)
    //         let players = room.sockets
    //         setPlayersQuestionStatus(players, questionMsg.multipleChoiceQuestions, questionMsg.blankWords)
    //         round.questionParagraph = questionMsg.originalParagraph
    //         messageModule.roundResultNotify(socket,false,roundCount)
    //       }
    //       else{
    //         //여기다가도 승패여부
    //         messageModule.roundResultNotify(socket,false,roundCount)
    //         console.log("finish")
    //         io.to(room.name).emit("finish")
    //         leaveRoom(room)
    //       }
    //     }
    //     else{
    //       result=checkPlayerSolveQuestion(multipleChoiceQuestions)
    //       if(result==true){
    //         //먼저 푼 사람
    //         messageModule.roundResultNotify(socket,true,roundCount)

    //         roundHistoryId=await matchService.recordRoundHistory(roundCount,roundQuestionParagraph,true,socket.matchHistoryId,socket.userName)
    //         console.log("roundHistoryId:",roundHistoryId)
    //         console.log("rightAnswerDict:",socket.rightAnswerDict)
    //         console.log("wrongAnswerDict:",socket.wrongAnswerDict)

    //         for(answerPositionIndex of Object.keys(socket.rightAnswerDict))
    //          await matchService.recordAnswerHistory(answerPositionIndex,socket.rightAnswerDict[answerPositionIndex],true,roundHistoryId)
    //         for(answerPositionIndex of Object.keys(socket.wrongAnswerDict)) {
    //          await matchService.recordAnswerHistory(answerPositionIndex,socket.wrongAnswerDict[answerPositionIndex],false,roundHistoryId)
    //         }
    //         socket.emit("waitOpponentSolveQuestion")
    //       }
    //     }
    //   }

    //   else{

    //     answerPositionIndex=round.questionParagraph.indexOf(rightAnswer)
    //     answerLength = rightAnswer.length

    //     if(Object.keys(socket.wrongAnswerDict)==0)
    //       socket.wrongAnswerDict[answerPositionIndex] =answerLength

    //     for(key of Object.keys(socket.wrongAnswerDict)){
    //       if(key!=answerPositionIndex){
    //         socket.wrongAnswerDict[answerPositionIndex] =answerLength
    //     }
    //   }

    //     setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
    //     messageModule.answerNotify(socket,roundCount,false)
    //     messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
    //     messageModule.broadcastAnswerNotify(socket,userName,roundCount,false)

    //   }
    // })
