const queries = require("../sql/match_history")
const userService = require("./user")

exports.recordTestMatchHistory=async(matchDate,difficulty,player1UserId, player2UserId)=>{
    let [row]=await queries.saveTestMatchHistory(matchDate,difficulty, player1UserId, player2UserId)
   return row[0].id
}


exports.recordTestRoundHistory=async(roundCount,questionParagraph,questionTranslation,winYN,userId,matchHistoryId)=>{
   let [row]=await queries.saveTestRoundHistory(roundCount,questionParagraph,questionTranslation,winYN,userId,matchHistoryId)
    return row[0].id
}


exports.recordTestAnswerHistory=async(answerStartIndex, answerEndIndex,answerYN,roundHistoryId,answerWord)=>{
    await queries.saveTestAnswerHistory(answerStartIndex, answerEndIndex,answerYN,roundHistoryId,answerWord)
}


exports.recordTestMatchResultHistory = async(matchHistoryId, winUserId)=>{
    await queries.saveTestMatchResultHistory(matchHistoryId, winUserId)
 }


exports.recordMatchResultHistory = async(matchDate,difficulty,winnerId,userId, opponentUserId)=>{
      let [row]=await queries.saveMatchResultHistory(matchDate,difficulty,winnerId,userId, opponentUserId)
      return row[0].id
 }



 exports.recordScoreHistory = async(matchDate,attainScore,userId) =>{
     await queries.saveScoreHistory(matchDate,attainScore,userId)
 }

exports.getMatchHistory = async (userId)=>{
    let[rows] = await queries.findMatchHistoryByUserId(userId)
    let jsonArray = new Array()

    for(row of rows){
      let json = new Object()
      json.id =row.id
      json.matchDate = row.match_date
      if(!row.difficulty){
        json.difficulty = 1
      }
      else{
        json.difficulty = row.difficulty
      }
      let winUserId = row.win_user_id
      if(row.player1_user_id != userId){
          opponentUserId=row.player1_user_id
          let [result]=await userService.getUserById(opponentUserId)
          if(!result[0][0]){
            json.opponentUserNickname = "test"
            json.opponentUserId = 1021
            let sampleImg = await userService.getSampleImg()
            json.opponentUserImg = sampleImg
          }

          else{
            json.opponentUserNickname = result[0][0].name
            json.opponentUserId = result[0][0].id
            json.opponentUserImg = result[0][0].img
          }
      }
      else{
          opponentUserId=row.player2_user_id
          let [result]=await userService.getUserById(opponentUserId)
          if(!result[0][0]){
            json.opponentUserNickname = "test"
            json.opponentUserId = 1022
            let sampleImg = await userService.getSampleImg()
            json.opponentUserImg = sampleImg
          }
          else{
            json.opponentUserNickname = result[0][0].name
            json.opponentUserId = result[0][0].id
            json.opponentUserImg = result[0][0].img
          }
      }
      if(winUserId == userId){
          json.winYN = Boolean(true)
      }
      else{
          json.winYN = Boolean(false)
      }
      jsonArray.push(json)
  }
  return jsonArray
}

exports.getRoundHistory = async(matchHistoryId,userId,opponentUserId)=>{

    let roundHistoryJson = new Object()
    let roundHistoryJsonArray = new Array()
    let opponetRoundHistoryJsonArray = new Array()

    let [roundRows] = await queries.findRoundHistoryByMatchHistoryIdAndUserId(matchHistoryId,userId)

    for(row of roundRows){
        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.questionTranslation = row.question_translation
        json.winYN = Boolean(row.win_yn)

        let [answerRows] = await queries.findAnswerHistoryByRoundHistoryId(row.id)

        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.startIndex = answerRow.answer_start_index
            answerJson.endIndex = answerRow.answer_end_index
            answerJson.answerYN = Boolean(answerRow.answer_yn)
            answerJsonArray.push(answerJson)
        }
        json.answerHistory = answerJsonArray
        roundHistoryJsonArray.push(json)
    }
    roundHistoryJson.myRoundHistory= roundHistoryJsonArray

    opponetRoundHistoryJsonArray = new Array()
    let [opponentRoundRows] = await queries.findRoundHistoryByMatchHistoryIdAndUserId(matchHistoryId,opponentUserId)

    for(row of opponentRoundRows){

        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.questionTranslation = row.question_translation
        json.winYN = Boolean(row.win_yn)
        let [answerRows] = await queries.findAnswerHistoryByRoundHistoryId(row.id)

        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.startIndex = answerRow.answer_start_index
            answerJson.endIndex = answerRow.answer_end_index
            answerJson.answerYN = Boolean(answerRow.answer_yn)
            answerJsonArray.push(answerJson)
        }
        json.answerHistory = answerJsonArray
        opponetRoundHistoryJsonArray.push(json)
    }

    roundHistoryJson.opponentRoundHistory= opponetRoundHistoryJsonArray
    return roundHistoryJson
}

exports.getAnswerHistory = async(roundHistoryId)=>{
    let rows = await queries.findAnswerHistoryByRoundHistoryId(roundHistoryId)
    return rows
}


exports.recordSoloMatchHistory = async(matchDate,difficulty,userId,isWin)=>{
    let [row]=await queries.saveSoloMatchHistory(matchDate,difficulty,userId,isWin)
    return row[0].id
}

exports.recordSoloRoundHistory = async(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin)=>{
    let [row]=await queries.saveSoloRoundHistory(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin)
    return row[0].id
}

exports.recordSoloAnswerHistory = async(roundHistoryId,isAnswer,answerStartIndex,answerEndIndex,answerRightWord)=>{
    await queries.saveSoloAnswerHistory(roundHistoryId,isAnswer,answerStartIndex,answerEndIndex,answerRightWord)
}

exports.getSoloMatchHistory = async(userId) =>{
    let rows = await queries.findSoloMatchHistoryByUserId(userId)
    return rows
}

exports.getSoloRoundHistory = async(matchHistoryId)=>{
    let rows = await queries.findSoloRoundHistoryByMatchHistoryId(matchHistoryId)
    return rows
}

exports.getSoloAnswerHistory = async(roundHistoryId)=>{
    let rows = await queries.findSoloAnswerHistoryByRoundHistoryId(roundHistoryId)
    return rows
}
