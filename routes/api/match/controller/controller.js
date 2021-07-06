const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const matchHistoryService = require("../../../../services/match_history")
const jwt =require('jsonwebtoken')
require("dotenv").config()


exports.getMatchHistory = async (req,res) =>{
    // const userId = await getUserIdByJwt(req.headers.auth)
    userId = 1031
    const [rows] = await matchHistoryService.getMatchHistory(userId)

    let jsonArray = new Array()
    for(row of rows){
        let json = new Object()
        json.id =row.id
        json.matchDate = row.match_date
        if(row.player1_user_id != userId){
            opponentUserId=row.player1_user_id
            row=await userService.getUserById(opponentUserId)
            json.opponentUserNickname = row[0].user_nickname
            json.opponentUserId = row[0].id
       }
        else{
            opponentUserId=row.player2_user_id
            row=await userService.getUserById(opponentUserId)
            json.opponentUserNickname = row[0].user_nickname
            json.opponentUserId = row[0].id
        }

        if(row.win_user_id == userId){
            json.winYN = Boolean(true)
        }
        else{
            json.winYN = Boolean(false)
        }
        jsonArray.push(json)
    }
    console.log(jsonArray)
    var jObj =  new Object()
    jObj.code = 200
    jObj.data = jsonArray

    res.status(200).send(jObj)

}

exports.getRoundHistory = async (req,res) =>{
    // const userId = await getUserIdByJwt(req.headers.auth)
    const userId =1031
    let matchHistoryId = req.query.matchHistoryId
    const opponentUserId = req.query.opponentUserId

    let roundHistoryJsonArray = new Array()
    let [roundRows] = await matchHistoryService.getRoundHistory(matchHistoryId,userId)
    for(row of roundRows){
        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.winYN = Boolean(row.win_yn)

        let [answerRows] = await matchHistoryService.getAnswerHistory(row.id)
        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.answerIndex = answerRow.answer_position_index
            answerJson.answerLength = answerRow.answer_length
            answerJson.answerYN = Boolean(answerRow.answer_yn)
            answerJsonArray.push(answerJson)
        }

        json.answerHistory = answerJsonArray
        roundHistoryJsonArray.push(json)
    }


    let [opponentRoundRows] = await matchHistoryService.getRoundHistory(matchHistoryId,opponentUserId)
    console.log(opponentRoundRows)
    for(row of opponentRoundRows){
        console.log(roundRows)

        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.winYN = Boolean(row.win_yn)
        let [answerRows] = await matchHistoryService.getAnswerHistory(row.id)
        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.answerIndex = answerRow.answer_position_index
            answerJson.answerLength = answerRow.answer_length
            answerJson.answerYN = Boolean(answerRow.answer_yn)
            answerJsonArray.push(answerJson)
        }
        console.log(answerJsonArray)
        json.answerHistory = answerJsonArray

        roundHistoryJsonArray.push(json)
    }
        var jObj =  new Object()
        jObj.code =200
        jObj.data = roundHistoryJsonArray

    res.status(200).send(jObj)
}



async function getUserIdByJwt(token){
  const decoded = jwt.verify(token, process.env.secret)
  const id = decoded.userId
  return id
}
