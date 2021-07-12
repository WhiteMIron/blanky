const queries = require("../sql/match_history")


exports.recordTestMatchHistory=async(matchDate, player1UserId, player2UserId)=>{
    let [row]=await queries.saveTestMatchHistory(matchDate, player1UserId, player2UserId)
   return row[0].id
}


exports.recordTestRoundHistory=async(roundCount,questionParagraph,winYN,userId,matchHistoryId)=>{
   let [row]=await queries.saveTestRoundHistory(roundCount,questionParagraph,winYN,userId,matchHistoryId)
    return row[0].id
}


exports.recordTestAnswerHistory=async(answerStartIndex, answerEndIndex,answerYN,roundHistoryId,answerWord)=>{
    await queries.saveTestAnswerHistory(answerStartIndex, answerEndIndex,answerYN,roundHistoryId,answerWord)
}


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
