const pool = require("../config/database");


exports.saveScoreHistory = async (matchDate,attainScore,userId)=>{
    const conn = await pool.getConnection()
    let sql = "INSERT INTO score_history (match_date,attain_score,user_id) values(?,?,?)"
    try{
        params =[matchDate,attainScore,userId]
        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}


exports.saveTestMatchHistory = async(matchDate, player1UserId, player2UserId)=>{
    const conn = await pool.getConnection()
    let sql = "INSERT INTO test_match_history (match_date,player1_user_id,player2_user_id) values(?,?,?)"
    try{
        params =[matchDate, player1UserId, player2UserId]
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
exports.saveTestMatchResultHistory = async(matchHistoryId, winUserId)=>{
    const conn = await pool.getConnection()
    let sql = "UPDATE test_match_history SET win_user_id =? where id = ?"

    try{
        params =[winUserId,matchHistoryId]
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

exports.saveTestRoundHistory = async(roundCount,questionParagraph,winYN,userId,matchHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="INSERT INTO test_round_history (round_count,question_paragraph,win_yn,user_id,match_history_id)"
            +"VALUES(?,?,?,?,?)"
    try{
        params=[roundCount,questionParagraph,winYN,userId,matchHistoryId]
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
exports.saveTestAnswerHistory = async(answerStartIndex, answerEndIndex,answerYN,roundHistoryId,answerWord)=>{
    const conn = await pool.getConnection()
    let sql="INSERT INTO test_answer_history(answer_start_index,answer_end_index,answer_yn,round_history_id,answer_word) values(?,?,?,?,?)"
    try{
        params = [ answerStartIndex,answerEndIndex,answerYN,roundHistoryId,answerWord]

        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }


}


exports.findMatchHistoryByUserId = async(userId)=>{

    const conn = await pool.getConnection()
    let sql ="SELECT * from test_match_history where player1_user_id = ? OR player2_user_id = ?"
    try{
        params = [userId,userId]
        let rows = conn.query(sql,params)
        return rows
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}


exports.findRoundHistoryByMatchHistoryIdAndUserId = async(matchHistoryId,userId)=>{
    const conn = await pool.getConnection()
    let sql ="SELECT * from test_round_history where match_history_id = ? AND user_id =?"
    try{
        params = [matchHistoryId,userId]
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
    let sql ="SELECT * from test_answer_history where round_history_id = ?"
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


exports.saveSoloMatchHistory = async (matchDate,userId,isWin)=>{
    const conn = await pool.getConnection()
    let sql ="INSERT INTO solo_match_history(match_history_date,win_yn,user_id) values(?,?,?)"
    try{
        params = [matchDate,isWin,userId]
        let row =conn.query(sql,params)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.saveSoloRoundHistory = async(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin)=>{
    const conn = await pool.getConnection()
    let sql ="INSERT INTO solo_round_history(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin) values(?,?,?,?,?)"
    try{
        params = [roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin]
        let row =conn.query(sql,params)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }

}

exports.saveSoloAnswerHistory = async(roundHistoryId,isAnswer,answerStartIndex,answerEndIndex,answerRightWord)=>{
    const conn = await pool.getConnection()
    let sql="INSERT INTO solo_answer_history(answer_start_index,answer_end_index,answer_yn,round_history_id,answer_word) values(?,?,?,?,?)"
    try{
        params = [ answerStartIndex,answerEndIndex,isAnswer,roundHistoryId,answerRightWord]

        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}



exports.findSoloMatchHistoryByUserId = async(userId)=>{

    const conn = await pool.getConnection()
    let sql ="SELECT * from solo_match_history where user_id = ?"
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

exports.findSoloRoundHistoryByMatchHistoryId = async(matchHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="SELECT * from solo_round_history where solo_match_history_id"
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

exports.findSoloAnswerHistoryByRoundHistoryId = async(roundHistoryId)=>{
    const conn = await pool.getConnection()
    let sql ="SELECT * from solo_answer_history where solo_round_history_id = ?"
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
