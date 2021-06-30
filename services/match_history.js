const queries = require("../sql/match_history")

exports.recordMatchHistory=async()=>{
    let [row]=await queries.saveMatchHistory()
    return row[0].id
}


exports.recordRoundHistory=async(roundCount,questionParagraph,winYN,matchHistoryId,userId)=>{
    let [row]=await queries.saveRoundHistory(roundCount,questionParagraph,winYN,matchHistoryId,userId)
    return row[0].id
}


exports.recordAnswerHistory=async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    await queries.saveAnswerHistory(answerPositionIndex, answerLength,answerYN,roundHistoryId)
  
}

