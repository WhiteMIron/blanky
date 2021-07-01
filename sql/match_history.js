const pool = require("../config/database");



exports.saveMatchHistory = async (dualYN,opponentUserName,userId,opponentId)=>{
    const conn = await pool.getConnection()
    let sql = "INSERT INTO match_history (match_date,dual_YN,opponent_user_name,user_id,opponent_user_id) values(Now(),?,?,?,?)"
    try{
        params =[dualYN,opponentUserName,userId,opponentId]
        conn.query(sql,params)
        sql = "SELECT LAST_INSERT_ID() as id"
        let row =  conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.saveMatchResultHistory = async(matchHistoryId,winYN,attainScore)=>{
    const conn = await pool.getConnection()
    let sql = "UPDATE match_history SET win_yn=?, attain_score = ? where id = ?"

    try{
        params =[winYN,attainScore,matchHistoryId]
        conn.query(sql,params)
        sql = "SELECT LAST_INSERT_ID() as id"
        let row =  conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}
exports.saveRoundHistory = async(roundCount,questionParagraph,winYN,matchHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="INSERT INTO round_history (round_count,question_paragraph,win_yn,match_history_id)"
            +"VALUES(?,?,?,?)"
    try{
        params=[roundCount,questionParagraph,winYN,matchHistoryId]
        conn.query(sql,params)
        sql = "SELECT LAST_INSERT_ID() as id"
        let row=  conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally
    {
        conn.release()
    }
}

exports.saveAnswerHistory = async(answerPositionIndex, answerLength,answerYN,roundHistoryId)=>{
    const conn = await pool.getConnection()
    let sql="INSERT INTO answer_history(answer_position_index,answer_length,answer_yn,round_history_id) values(?,?,?,?)"
    try{
        params = [ answerPositionIndex,answerLength,answerYN,roundHistoryId]
        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}


exports.findMatchHistoryByUserId = async(userId)=>{

    const conn = await pool.getConnection()
    console.log("userId:",userId    )
    let sql ="SELECT * FROM match_history  WHERE user_id = ? AND dual_YN =1"
    try{
        params = [userId]
        let rows = conn.query(sql,params)
        return rows
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.findMatchHistoryByUserIdAndMatchDate = async(userId,matchDate)=>{

    const conn = await pool.getConnection()
    let sql ="SELECT * FROM match_history  WHERE user_id = ? AND match_date = STR_TO_DATE(?,'%Y-%m-%d %T') "
    try{
        params = [userId,matchDate]
        let row = conn.query(sql,params)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }

}



exports.findRoundHistoryByMatchHistoryId = async(matchHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="SELECT * from round_history where match_history_id = ?"
    try{
        params = [matchHistoryId]
        let row =conn.query(sql,params)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }

}

exports.findAnswerHistoryByRoundHistoryId = async(roundHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="SELECT * from answer_history where round_history_id = ?"
    try{
        params = [roundHistoryId]
        let row =conn.query(sql,params)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}
