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
  var sql = "UPDATE uset SET uset_profile =? where id = ?"
  params=[profile,id]
  try{
    conn.query(sql,params)
  }catch(e){
    throw new Error(e)
  }finally{
    conn.release()
  }
}
