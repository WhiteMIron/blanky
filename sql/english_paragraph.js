const pool = require("../config/database");


exports.findByParagraphDifficulty =async (difficulty)=>{
  const conn = await pool.getConnection()
  var sql = "SELECT ep.id, ep.english_paragraph FROM english_paragraph ep WHERE ep.english_difficulty =?"

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
  var sql = "SELECT english_translation FROM english_paragraph where id=?"
  try {
    const rows = conn.query(sql, paragraphId)
    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
