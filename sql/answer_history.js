const pool = require("../config/database");


exports.saveAnswerHistory =async (answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{

  const conn = await pool.getConnection()
  let sql =" INSERT IGNORE INTO answer_history (answer_position_index, answer_length,answer_yn,round_history_id)"
  +"VALUES (?,?,?,?)"
  
  let params=[answerPositionIndex,answerLength,answerYN,roundHistoryId]
  
  try {
    conn.query(sql,params)
} catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }

}
