const pool = require("../config/database");


exports.saveAnswerHistory =async (word,positionIndex)=>{

  const conn = await pool.getConnection()

  let sql = "INSERT INTO answer_history(answer_word)"

  +"SELECT ? FROM DUAL WHERE NOT EXISTS(SELECT 'A' FROM answer_history WHERE answer_word =?)"
  let params=[word,positionIndex]
  
  try {
    conn.query(sql,params)
} catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }

}
