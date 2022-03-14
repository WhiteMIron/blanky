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


exports.findChapterList=async ()=>{
  const conn = await pool.getConnection()
  try {
    const rows = conn.query(
    //전체 챕터 리스트(최근순) 5개
    `SELECT id, english_paragraph_chapter_name AS 'name', english_paragraph__play_count AS 'count',
    CASE english_paragraph_difficulty WHEN 1 THEN "Easy" WHEN 2 THEN "Normal" WHEN 3 THEN "Hard" END AS difficulty
    , english_paragraph_chapter_img AS 'img',  english_paragraph_created_at AS 'addedDate'
    FROM english_paragraph ORDER BY english_paragraph_created_at DESC;`)

    // //솔로모드 easy 챕터 리스트(최근순)
    // `SELECT id, english_paragraph_chapter_name AS 'name', english_paragraph__play_count AS 'count',
    // english_paragraph_chapter_img AS 'img', english_paragraph_created_at AS 'addedDate'
    // FROM english_paragraph WHERE english_paragraph_difficulty=1 ORDER BY english_paragraph_created_at DESC;`+
    //
    // //솔로모드 normal 챕터 리스트(최근순)
    // `SELECT id, english_paragraph_chapter_name AS 'name', english_paragraph__play_count AS 'count',
    // english_paragraph_chapter_img AS 'img', english_paragraph_created_at AS 'addedDate'
    // FROM english_paragraph WHERE english_paragraph_difficulty=2 ORDER BY english_paragraph_created_at DESC;`+
    //
    // //솔로모드 hard 챕터 리스트(최근순)
    // `SELECT id, english_paragraph_chapter_name AS 'name', english_paragraph__play_count AS 'count',
    // english_paragraph_chapter_img AS 'img', english_paragraph_created_at AS 'addedDate'
    // FROM english_paragraph WHERE english_paragraph_difficulty=3 ORDER BY english_paragraph_created_at DESC;`)

    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}



exports.modifyPlayCount = async(chapterId)=>{
  // console.log("chapterId:",chapterId)
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
    english_paragraph_chapter_img AS 'img',english_paragraph_difficulty AS 'difficulty'  FROM english_paragraph ORDER BY count DESC, name ASC LIMIT 10;`)

    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}


exports.saveParagraph = async(chapterName,addSharpParagraphs,addSharpTranslations,difficulty)=>{

  const conn = await pool.getConnection()
  var sql = "INSERT INTO english_paragraph (english_paragraph_chapter_name,english_paragraph,english_paragraph_translation,english_paragraph_difficulty,english_paragraph_created_at)"
          +"values (?,?,?,?,now())"
  try {
    params=[chapterName,addSharpParagraphs,addSharpTranslations,difficulty]
    conn.query(sql, params)
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}

exports.modifyParagraph=async(addSharpParagraphs,addSharpTranslations,paragraphId)=>{

  const conn = await pool.getConnection()
  var sql = "UPDATE english_paragraph SET english_paragraph= ? , english_paragraph_translation=?  where id = ?"
  try {
    params=[addSharpParagraphs,addSharpTranslations,paragraphId]
    conn.query(sql, params)
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}



exports.modifyParagraphDifficulty=async(paragraphId,difficulty)=>{

  const conn = await pool.getConnection()
  var sql = "UPDATE english_paragraph SET english_paragraph_difficulty= ?  where id = ?"
  try {
    params=[difficulty,paragraphId]
    conn.query(sql, params)
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
