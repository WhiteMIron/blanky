const queries = require("../sql/match_history")

exports.recordMatchHistory=async()=>{
    let [row]=await queries.saveMatchHistory()
    return row.id
}


exports.recordRoundHistory=async(roundCount,attain_score,question_paragraph,matchHistoryId,userId)=>{
    let [row]=await queries.saveRoundHistory(roundCount,attain_score,question_paragraph,matchHistoryId,userId)
    return row.id
}


exports.recordAnswerHistory=async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    await queries.saveAnswerHistory(answerPositionIndex, answerLength,answerYN,roundHistoryId)
  
}

