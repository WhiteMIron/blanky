const constants = require("../../consts_folder/socket/constants")
const questionModule = require("../quiz/question")
const checkAnswerModule = require("../quiz/check_answer")
const messageModule = require("./message")
const chatModule = require("./chat")

exports.play = function(socket, io, rooms) {
    socket.on('start', async function() {
    if (socket.status == constants.matched) {
      let room = socket.room
      checkReadyPlayer(room,socket)
      let roomStatus = isReadyRoom(room, socket)
      if (roomStatus == constants.ready) {
        try {
          setPlayStatusRoom(room)
          let questionMsg = await createQuestion()
          sendQuestion(io, room, questionMsg)
          let players = room.sockets
          setPlayersQuestionStatus(players, questionMsg.multipleChoiceQuestions, questionMsg.blankWords)
        } catch (error) {
          msg = {
            code: 400,
            msg: "문제 전송 실패"
          }
          io.to(room.name).emit('errorPrintQuestion', msg);
        }
      }
      else
          messageModule.startWaiting(socket)
    }
  })
    socket.on('answer', async function(data) {
      answer = data.answer - 1
      let result = await checkAnswerModule.isRightAnswer(answer, socket.multipleChoiceQuestions, socket.blankWords)
      let userName = socket.userName
      let round = socket.room.round

      let blankWords = result.blankWords
      let multipleChoiceQuestions = result.multipleChoiceQuestions

      if (result.isRight == true) {
        plusScore(socket)
        let score = socket.score
        setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
        messageModule.answerRight(socket,round,score)
        messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
        messageModule.broadcastAnswerRight(socket,userName,round,score)
  }


      if (result.isRight == false) {
        minusScore(socket)
        let score = socket.score
        setQuestionStatus(socket,multipleChoiceQuestions,blankWords)
        messageModule.answerWrong(socket,round,score)
        messageModule.printMultipleChoiceQuestions(socket,multipleChoiceQuestions)
        messageModule.broadcastAnswerWrong(socket,userName,round,score)
      }
    })

}

function plusScore(socket){
  socket.score += 10
}

function minusScore(socket){
  socket.score -= 3
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
  let roomName = room.name
  messageModule.broadcastQuestion(io,roomName,questionMsg)
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

function removeRoom(room){
  let roomName = room.name
  room.sockets.splice(0,room.sockets.length)

  socket.leave(roomName)
}
