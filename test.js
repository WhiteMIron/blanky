const sql = require("./sql/match_history");


(async function(){

    [row] =await sql.saveMatchHistory("2012-05-14")
    console.log(row)

})()
