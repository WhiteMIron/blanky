const router = require("express").Router()
const request = require("request")
const db = require("../config/database")
// /accounts/rest-auth/kakao/)

// import router from 'express'
// import request from  'request'
// import db  from '../config/config'


router.get("/",function(req,res,next){


    // const connection = mysql.createConnection(databaseConfig.db_info)

    //연결 성공 및 에러처리는 어케해야하려나?

    // connection.on('error',console.error)
    // connection.once('open',()=>{
    //     console.log("connected to mysql server")
    // })
    
    // connection.on('error',function(err){

    //     console.log("database connection fail err:",err)
    // })

    // const db =require("../config/database")
    
    var sql = 'select * from user where id=?'
    var params = ["1"]

    try{

        db.query(sql,"1",function(err, rows, fields){
            if(err)console.log('query is not excuted. select fail...\n'+err)
            
            else {
    
                if(rows.length==0)
                    res.send("일치하는 id가 없습니다.")
                else    
                    throw new Error('c error');
    
                    res.send("일치하는 id가 있습니다. id:"+rows[0].id)
                    
                    // res.send(rows)
    
            } 
            db.end
                
        })

    }catch(error){
        console.log("!!!")
      
    }

})
    // db.query(sql,"1",function(err, rows, fields){
    //     if(err)console.log('query is not excuted. select fail...\n'+err)
        
    //     else {

    //         if(rows.length==0)
    //             res.send("일치하는 id가 없습니다.")
    //         else    
    //             // throw new Error('c error');

    //             res.send("일치하는 id가 있습니다. id:"+rows[0].id)
                
    //             // res.send(rows)

    //     } 
    //     db.end
            
    // })


    // var sql = 'INSERT INTO BOARD VALUES(?, ?, ?, NOW())';
    // var params = [body.id, body.title, body.content];
    // console.log(sql);
    // conn.query(sql, params, function(err) {
    //     if(err) console.log('query is not excuted. insert fail...\n' + err);
    //     else res.redirect('/list');
    // });



router.get('/signin',  (req, res, next) => {
 
    next("error!")

})
module.exports=router