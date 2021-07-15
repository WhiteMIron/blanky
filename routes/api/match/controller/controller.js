const queries = require("../../../../sql/user")
const userService = require("../../../../services/user")
const matchHistoryService = require("../../../../services/match_history")
const jwt =require('jsonwebtoken')
require("dotenv").config()


exports.getMatchHistory = async (req,res) =>{
    // const userId = await getUserIdByJwt(req.headers.auth)
    userId = 1020
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
    const userId =1020
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
            answerJson.word = answerRow.answer_right_word
            answerJson.startIndex = answerRow.answer_start_index
            answerJson.endIndex = answerRow.answer_end_index
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

//라운드 정보 다 줬을 때 기록하게 하는게 나을듯
//매치,라운드,답변기록 다 한번에 처리



exports.recordSoloMatchHistory=async(req,res)=>{

    let userId =await getUserIdByJwt(req.headers.auth)
   
    let history = req.body
    
    let matchHistory = history.matchHistory
    let matchDate = matchHistory.matchDate
    let isWin  =  matchHistory.isMatchWin

    let matchHistoryId = await englishParagraphService.recordSoloMatchHistory(matchDate,userId,isWin)

    let roundHistories = history.roundHistory 

    for ( roundHistory of roundHistories){
      let roundCount = roundHistory.count
      let questionParagraph = roundHistory.questionParagraph
      let questionTranslation = roundHistory.questionTranslation
      isWin = roundHistory.isWin
      
      let roundHistoryId = await englishParagraphService.recordSoloRoundHistory(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin)
      let answerHistory = roundHistory.answerHistory
      let isAnswer = answerHistory.isAnswer
      let answerStartIndex = answerHistory.startIndex
      let answerEndIndex = answerHistory.endIndex
      let answerRightWord = answerHistory.rightWord
      await englishParagraphService.recordSoloAnswerHistory(roundHistoryId, isAnswer,answerStartIndex, answerEndIndex, answerRightWord )

    } 

    let jObj = new Object()
    jObj.code =201
    jObj.message = "솔로 대전 기록 저장 완료"
    res.status(201).send(jObj)

    
}

exports.getSoloMatchHistory = async(req,res)=>{
    let userId =await getUserIdByJwt(req.headers.auth)
    console.log("userId:",userId)
    const [rows] = await matchHistoryService.getSoloMatchHistory(userId)

    console.log(rows)
    let jsonArray = new Array()
    for(row of rows){
        let json = new Object()
        json.matchHistoryId =row.id
        json.matchDate = row.match_history_date
        json.isWin = row.win_yn
        jsonArray.push(json)
    }
    console.log(jsonArray)
    var jObj =  new Object()
    jObj.code = 200
    jObj.data = jsonArray

    res.status(200).send(jObj)
}

exports.getSoloRoundHistory = async(req,res)=>{
    let matchHistoryId = req.params.matchHistoryId
    const [roundRows] = await matchHistoryService.getSoloRoundHistory(matchHistoryId)
    let roundHistoryJsonArray = new Array()
    for( row of roundRows){ 
        let roundJson = new Object()
        
        roundJson.roundHistoryId = row.id
        roundJson.roundCount = row.round_count
        roundJson.questionParagraph = row.question_paragraph
        roundJson.questionTranslation = row.question_translation
        roundJson.isWin = row.win_yn
        console.log("roundJson:",roundJson)
        let [answerRows] = await matchHistoryService.getSoloAnswerHistory( roundJson.roundHistoryId )
        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
            answerJson.word = answerRow.answer_right_word
            answerJson.startIndex = answerRow.answer_start_index
            answerJson.endIndex = answerRow.answer_end_index
            answerJson.answerYN = Boolean(answerRow.answer_yn)
            answerJsonArray.push(answerJson)
        }   
        roundJson.answerHistory = answerJsonArray
        roundHistoryJsonArray.push(roundJson)
    }
    let jObj = new Object()
    jObj.code =200
    jObj.data = roundHistoryJsonArray
    res.status(200).send(jObj)
}

async function getUserIdByJwt(token){
  const decoded = jwt.verify(token, process.env.secret)
  console.log(decoded)
  const id = decoded.userId
    
  return id
}
