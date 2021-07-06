const queries = require("../sql/match_history")

exports.recordMatchHistory=async(dualYN,opponentUserName,userId,opponentId)=>{
    let [row]=await queries.saveMatchHistory(dualYN,opponentUserName,userId,opponentId)
    return row[0].id
}


//Test
exports.recordTestMatchHistory=async(matchDate, player1UserId, player2UserId)=>{
    let [row]=await queries.saveTestMatchHistory(matchDate, player1UserId, player2UserId)
   return row[0].id
}



exports.recordRoundHistory=async(roundCount,questionParagraph,winYN,matchHistoryId)=>{
    let [row]=await queries.saveRoundHistory(roundCount,questionParagraph,winYN,matchHistoryId)
    return row[0].id
}

//Test

exports.recordTestRoundHistory=async(roundCount,questionParagraph,winYN,userId,matchHistoryId)=>{
   let [row]=await queries.saveTestRoundHistory(roundCount,questionParagraph,winYN,userId,matchHistoryId)
    return row[0].id
}

exports.recordAnswerHistory=async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    await queries.saveAnswerHistory(answerPositionIndex, answerLength,answerYN,roundHistoryId)
}

exports.recordTestAnswerHistory=async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    await queries.saveTestAnswerHistory(answerPositionIndex, answerLength,answerYN,roundHistoryId)

}

exports.recordMatchResultHistory = async(matchHistoryId,winYN,attainScore)=>{
   await queries.saveMatchResultHistory(matchHistoryId,winYN,attainScore)
}

//Test
exports.recordTestMatchResultHistory = async(matchHistoryId, winUserId)=>{
    await queries.saveTestMatchResultHistory(matchHistoryId, winUserId)
 }

 exports.recordScoreHistory = async(matchDate,attainScore,userId) =>{
     await queries.saveScoreHistory(matchDate,attainScore,userId)
 }

exports.getMatchHistory = async (userId)=>{
    let rows = await queries.findMatchHistoryByUserId(userId)
    return rows
}

exports.getRoundHistory = async(matchHistoryId,userId)=>{
    let rows = await queries.findRoundHistoryByMatchHistoryIdAndUserId(matchHistoryId,userId)
    return rows
}

exports.getAnswerHistory = async(roundHistoryId)=>{
    let rows = await queries.findAnswerHistoryByRoundHistoryId(roundHistoryId)
    return rows
}
