const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const matchHistoryService = require("../../../../services/match_history")
const jwt =require('jsonwebtoken')
require("dotenv").config()


exports.getMatchHistory = async (req,res) =>{
    const userId = await getUserIdByJwt(req.headers.auth)
    const [rows] = await matchHistoryService.getMatchHistory(userId)

    let jsonArray = new Array()

    for(row of rows){
        let json = new Object()
        json.id =row.id
        json.matchDate = row.match_date
        json.winYN = row.win_YN
        json.opponetUserId = row.opponent_user_id
        jsonArray.push(json)
    }

    var jObj =  new Object()
    jObj.code = 200
    jObj.data = jsonArray

    res.status(200).send(jObj)

}

exports.getRoundHistory = async (req,res) =>{
    let matchHistoryId = req.query.matchHistoryId
    const opponetUserId = req.query.opponentUserId
    let matchDate = req.query.matchDate

    let [roundRows] = await matchHistoryService.getRoundHistory(matchHistoryId)
    let roundHistoryJsonArray = new Array() 
    for(row of roundRows){
        console.log("Aa")
        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.winYN = row.win_yn

        let [answerRows] = await matchHistoryService.getAnswerHistory(row.id)
        let answerjsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.answerIndex = answerRow.answer_position_index
            answerJson.answerLength = answerRow.answer_length     
            answerJson.answerYN = answerRow.answer_yn
            answerjsonArray.push(answerJson)
        }
        console.log("11",answerjsonArray)

        json.answerHistory = answerjsonArray
        roundHistoryJsonArray.push(json)
    }

    [row] = await matchHistoryService.getOpponentMatchHistory(opponetUserId,matchDate)
    matchHistoryId = row[0].id
 
    let [opponentRoundRows] = await matchHistoryService.getRoundHistory(matchHistoryId)
    for(row of opponentRoundRows){
        console.log("이거 수행~~")
        let json = new Object()
        json.roundCount =row.round_count
        json.questionParagraph = row.question_paragraph
        json.winYN = row.win_yn
   
        let [answerRows] = await matchHistoryService.getAnswerHistory(row.id)
        let answerjsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.answerIndex = answerRow.answer_position_index
            answerJson.answerLength = answerRow.answer_length     
            answerJson.answerYN = answerRow.answer_yn
            answerjsonArray.push(answerJson)
        }
        console.log(answerjsonArray)
        json.answerHistory = answerjsonArray

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
