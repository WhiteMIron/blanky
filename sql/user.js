const pool = require("../config/database")

exports.findOneByUserId= async(userId)=>{
  const conn = await pool.getConnection()
  try{
    const rows = conn.query(
      `SELECT * FROM (SELECT id, user_nickname AS 'name', user_email AS 'email', user_school AS 'school',
      user_dual_score AS 'score', user_profile_img AS 'img', user_description AS 'description',
      RANK() OVER (ORDER BY user_dual_score DESC) AS ranknum FROM user)user WHERE id='${userId}';`+
      `SELECT COUNT(*) AS 'count' FROM user;`)
      return rows
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
        sql = "SELECT LAST_INSERT_ID() as id"
        let row =  conn.query(sql)
        return row
    }catch(e){
        throw new Error(e)
    }finally{
        conn.release()
    }
}

exports.modifyUserInfo = async(user,id)=>{
  const conn =  await pool.getConnection()
  // console.log(user,id)
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
      //?????? ????????? ????????? ??????
      `SELECT DATE(tally.date) AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK)AND NOW() GROUP BY DATE(tally.date);`+

      //?????? 10??? ????????? ??????
      `SELECT DATE(tally.date) AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN DATE_ADD(date_format(DATE_ADD(NOW(),INTERVAL -9 WEEK),'%Y-%m-%d'), INTERVAL (DAYOFWEEK(date_format(DATE_ADD(NOW(),INTERVAL -9 WEEK),'%Y-%m-%d'))-1) * -1 DAY) AND NOW() GROUP BY WEEK(tally.date);`+

      //?????? 12?????? ????????? ??????
      `SELECT DATE(tally.date) AS date, IFNULL(sum(score_history.attain_score), 0) AS score FROM score_history RIGHT OUTER JOIN tally ON DATE(score_history.match_date) = DATE(tally.date) AND user_id ='${graphId}'
       WHERE DATE(tally.date) BETWEEN date_format(DATE_ADD(NOW(),INTERVAL -11 MONTH),'%Y-%m-01') AND NOW() GROUP BY MONTH(tally.date);`)
    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
exports.findRanks =async ()=>{
  const conn = await pool.getConnection()
  try {
    const rows = conn.query(
    //?????? ?????? ??????
    `SELECT RANK() OVER (ORDER BY dualScore DESC) AS 'rank', id, nickname, dualScore, profileImg, email, school,description FROM
    (SELECT id, user_nickname AS 'nickname', user_dual_score AS 'dualScore', user_profile_img AS 'profileImg', user_email AS 'email', user_school AS school, user_description AS description  FROM user ORDER BY nickname ASC LIMIT 50)user;`)


    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}

exports.findSampleImg = async()=>{
  const conn = await pool.getConnection()
  try {
    sql ="SELECT * FROM profile_img"
    const rows = conn.query(sql)
    return rows
  } catch (e) {
    throw new Error(e)
  } finally {
    conn.release()
  }
}
