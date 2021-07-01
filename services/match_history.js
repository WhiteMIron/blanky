const queries = require("../sql/match_history")

exports.recordMatchHistory=async(dualYN,opponentUserName,userId,opponentId)=>{
    let [row]=await queries.saveMatchHistory(dualYN,opponentUserName,userId,opponentId)
    return row[0].id
}


exports.recordRoundHistory=async(roundCount,questionParagraph,winYN,matchHistoryId)=>{
    let [row]=await queries.saveRoundHistory(roundCount,questionParagraph,winYN,matchHistoryId)
    return row[0].id
}


exports.recordAnswerHistory=async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    await queries.saveAnswerHistory(answerPositionIndex, answerLength,answerYN,roundHistoryId)
  
}

exports.recordMatchResultHistory = async(matchHistoryId,winYN,attainScore)=>{
   await queries.saveMatchResultHistory(matchHistoryId,winYN,attainScore) 
}

exports.getMatchHistory = async (userId)=>{
    let rows = await queries.findMatchHistoryByUserId(userId)
    return rows
}

exports.getRoundHistory = async(matchHistoryId)=>{
    let rows = await queries.findRoundHistoryByMatchHistoryId(matchHistoryId)
    return rows
}

exports.getAnswerHistory = async(roundHistoryId)=>{
    let rows = await queries.findAnswerHistoryByRoundHistoryId(roundHistoryId)
    return rows

}

exports.getOpponentMatchHistory = async(userId,matchDate)=>{
    let row = await queries.findMatchHistoryByUserIdAndMatchDate(userId,matchDate)
    return row
}
