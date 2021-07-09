const pool = require("../config/database")

exports.findOneByUserId= async(userId)=>{
    const conn = await pool.getConnection()
    var sql="SELECT * FROM user where id=?"
    try{
        const [row]= await conn.query(sql,userId)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()

    }
}

exports.findOneByUserKakaoId = async(userkakaoId)=>{

    const conn = await pool.getConnection()
    var sql="SELECT * FROM user where user_id=?"
    try{
        const [row] = await conn.query(sql,userkakaoId)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }

}

exports.findOneByUserKakaoIdAndVerify= async(userKakaoId)=>{

    const conn = await pool.getConnection()
    var sql="SELECT * FROM user where user_id=? and user_verify=1"
    try{
        const [row]= await conn.query(sql,userKakaoId)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}



exports.saveUser = async(user)=>{
    const conn = await pool.getConnection()

    var sql ="Insert into user (user_id,user_nickname,user_email,user_profile_img) values(?,?,?,?)"

    params=[user.kakaoId,user.name,user.email,user.profileImg]
    try{
        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally {
        conn.release()
    }

}
exports.saveUserAdditionalInfo = async(user)=>{
    const conn = await pool.getConnection()

    var sql ="UPDATE user SET user_school= ?, user_verify=1 where id =? "
    params=[user.school,user.id]
    try{
        conn.query(sql,params)
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.modifyUserInfo = async(user,id)=>{
  const conn =  await pool.getConnection()
  console.log(user,id)
  var sql = "UPDATE user SET user_nickname=?, user_email=?, user_school=?, user_description=? WHERE id=?"
  params=[user.nickname, user.email, user.school, user.description, id ]
  try{
    conn.query(sql,params)
  }catch(e){
    throw new Error(e)
  }finally{
    conn.release()
  }

}

exports.modifyUserProfile = async(profile,id)=>{
  const conn = await pool.getConnection()
  var sql = "UPDATE user SET user_profile_img =? where id = ?"
  params=[profile,id]
  try{
    conn.query(sql,params)
  }catch(e){
    throw new Error(e)
  }finally{
    conn.release()
  }
}

exports.modifyUserScore = async(id,attainScore)=>{
    const conn = await pool.getConnection()
    var sql = "UPDATE user SET user_dual_score=user_dual_score +(?) where id = ?"
    params=[attainScore,id]
    try{
      conn.query(sql,params)
    }catch(e){
      throw new Error(e)
    }finally{
      conn.release()
    }
}

exports.findByGraphStatistics = async (graphId) => {
  const conn = await pool.getConnection()
  try {
    const rows = conn.query(
      //최근 일주일 일별로 통계
      `SELECT DATE(tally.date) AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK)AND NOW() GROUP BY DATE(tally.date);`+

      //최근 10주 주별로 통계
      `SELECT DATE(tally.date) AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN DATE_ADD(date_format(DATE_ADD(NOW(),INTERVAL -9 WEEK),'%Y-%m-%d'), INTERVAL (DAYOFWEEK(date_format(DATE_ADD(NOW(),INTERVAL -9 WEEK),'%Y-%m-%d'))-1) * -1 DAY) AND NOW() GROUP BY WEEK(tally.date);`+

      //최근 12개월 월별로 통계
      `SELECT date_format(DATE(tally.date), '%Y-%m') AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN date_format(DATE_ADD(NOW(),INTERVAL -11 MONTH),'%Y-%m-01') AND NOW() GROUP BY MONTH(tally.date);`)
    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}

exports.findRanksByuserId =async ()=>{
  const conn = await pool.getConnection()
  try {
    const rows = conn.query(
    //전체 유저 랭킹 조회
    `SELECT user_id, user_nickname AS 'name', user_dual_score AS 'score',
    user_profile_img AS 'img' FROM user ORDER BY score DESC, name ASC LIMIT 50;`)

    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
