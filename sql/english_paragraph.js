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


exports.modifyPlayCount = async(chapterId)=>{
  const conn = await pool.getConnection()
  var sql = "UPDATE english_paragraph SET english_paragraph__play_count =english_paragraph__play_count+1 where id=?"
  try {
    const row = conn.query(sql, chapterId)
    return row
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}


exports.findChapterRanks=async ()=>{
  const conn = await pool.getConnection()
  try {
    const rows = conn.query(
    //인기 있는 챕터 조회
    `SELECT id, english_paragraph_chapter_name AS 'name', english_paragraph__play_count AS 'count',
    english_paragraph_chapter_img AS 'img' FROM english_paragraph ORDER BY count DESC, name ASC LIMIT 10;`)

    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}