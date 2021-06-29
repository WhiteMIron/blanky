const pool = require("../config/database");



exports.saveMatchHistory = async (date)=>{
    const conn = await pool.getConnection()
    let sql = "INSERT INTO match_history (match_date) values(?)"
    try{
        conn.query(sql,date)
        sql = "SELECT MAX(LAST_INSERT_ID()) from match_history"
        let row = conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
        pool.end()
    }
}
