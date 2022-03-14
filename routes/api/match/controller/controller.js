const userService = require("../../../../services/user")
const matchHistoryService = require("../../../../services/match_history")
const jwt =require('jsonwebtoken')
require("dotenv").config()


exports.getMatchHistory = async (req,res) =>{
    let userId = await getUserIdByJwt(req.headers.auth)
    if(req.params.id != userId){
      userId = req.params.id
    }
    // console.log("대전기록 조회 요청 들어옴")
    let matchHistoryArray = await matchHistoryService.getMatchHistory(userId)
    res.status(200).send({code:200,data:matchHistoryArray})
}

exports.getRoundHistory = async (req,res) =>{
    const userId = await getUserIdByJwt(req.headers.auth)
    let matchHistoryId = req.query.matchHistoryId
    const opponentUserId = req.query.opponentUserId

    let roundHistoryJson= await matchHistoryService.getRoundHistory(matchHistoryId,userId,opponentUserId)
    res.status(200).send({code:200,data:roundHistoryJson})
}



exports.recordSoloMatchHistory=async(req,res)=>{

    let userId =await getUserIdByJwt(req.headers.auth)


    let history = req.body
    let matchHistory =  history.matchHistory
    let matchDate = matchHistory.matchDate
    let difficulty = matchHistory.difficulty
    let isWin  =  matchHistory.isMatchWin
    let matchHistoryId = await matchHistoryService.recordSoloMatchHistory(matchDate,difficulty,userId,isWin)
    let roundHistories = matchHistory.roundHistories

    for ( roundHistory of roundHistories){
      let roundCount = roundHistory.count
      let questionParagraph = roundHistory.questionParagraph
      let questionTranslation = roundHistory.questionTranslation
      isWin = roundHistory.isWin

      let roundHistoryId = await matchHistoryService.recordSoloRoundHistory(roundCount,matchHistoryId,questionParagraph,questionTranslation,isWin)
      let answerHistory = roundHistory.answerHistory
      let isAnswer = answerHistory.isAnswer
      let answerStartIndex = answerHistory.startIndex
      let answerEndIndex = answerHistory.endIndex
      let answerRightWord = answerHistory.rightWord

      await matchHistoryService.recordSoloAnswerHistory(roundHistoryId, isAnswer,answerStartIndex, answerEndIndex, answerRightWord )
    }

    let jObj = new Object()
    jObj.code =201
    jObj.message = "솔로 대전 기록 저장 완료"
    res.status(201).send(jObj)


}

exports.getSoloMatchHistory = async(req,res)=>{
    let userId =await getUserIdByJwt(req.headers.auth)
    // console.log("userId:",userId)
    const [rows] = await matchHistoryService.getSoloMatchHistory(userId)

    console.log(rows)
    let jsonArray = new Array()
    for(row of rows){
        let json = new Object()
        json.matchHistoryId =row.id
        json.matchDate = row.match_history_date
        json.difficulty = row.difficulty
        json.isWin = row.win_yn
        jsonArray.push(json)
    }
    var jObj =  new Object()
    jObj.code = 200
    jObj.data = jsonArray

    res.status(200).send(jObj)
}

exports.getSoloRoundHistory = async(req,res)=>{
    let matchHistoryId = req.query.matchHistoryId
    const [roundRows] = await matchHistoryService.getSoloRoundHistory(matchHistoryId)
    let roundHistoryJsonArray = new Array()
    for( row of roundRows){
        let roundJson = new Object()

        roundJson.roundHistoryId = row.id
        roundJson.roundCount = row.round_count
        roundJson.questionParagraph = row.question_paragraph
        roundJson.questionTranslation = row.question_translation
        roundJson.isWin = row.win_yn
        let [answerRows] = await matchHistoryService.getSoloAnswerHistory( roundJson.roundHistoryId )
        let answerJsonArray = new Array()
        for (answerRow of answerRows){
            let answerJson = new Object()
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
  const id = decoded.userId

  return id
}
