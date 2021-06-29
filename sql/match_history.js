const pool = require("../config/database");



exports.saveMatchHistory = async ()=>{
    const conn = await pool.getConnection()
    let sql = "INSERT INTO match_history (match_date) values(Now())"
    
    try{
        conn.query(sql)
        sql = "SELECT LAST_INSERT_ID() as id"
        let [row]= await conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.saveRoundHistory = async(roundCount,attainScore,questionParagraph,matchHistoryId,userId)=>{
    const conn = await pool.getConnection()
    let sql ="INSERT INTO round_history (round,attain_score,question_paragraph,match_history_id,user_id)"
            +"VALUES(?,?,?,?,?)"
    try{
        params=[roundCount,attainScore,questionParagraph,matchHistoryId,userId]
        conn.query(sql,params)
        sql = "SELECT LAST_INSERT_ID() as id"
        let [row]= await conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally
    {
        conn.release
    }
}

exports.saveAnswerHistory = async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    const conn = await pool.getConnection()
    let sql="INSERT INTO answer_history(answer_position_index,answer_length,answer_yn,round_history_id) values(?,?,?,?)"
    try{
        params = [ answerPositionIndex,answerLength,answerYN,roundHistoryId]
        await conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release
    }
}