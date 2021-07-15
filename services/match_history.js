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


exports.recordSoloMatchHistory = async(matchDate,userId,isWin)=>{
    let [row]=await queries.saveSoloMatchHistory(matchDate,userId,isWin)
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