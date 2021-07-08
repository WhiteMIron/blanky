const pool = require("../config/database");


exports.findByParagraphDifficulty =async (difficulty)=>{
  const conn = await pool.getConnection()
  var sql = "SELECT * FROM english_paragraph ep WHERE ep.english_paragraph_difficulty=?"

  try {
    const rows = conn.query(sql, difficulty)
    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }

}

exports.findByParagraphId = async(paragraphId)=>{

  const conn = await pool.getConnection()
  var sql = "SELECT * FROM english_paragraph where id=?"
  try {
    const row = conn.query(sql, paragraphId)
    return row
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
