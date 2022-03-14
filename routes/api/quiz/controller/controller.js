const dirName ="/home/ec2-user/blankyV11/views"

const englishParagraphService = require("../../../../services/english_paragraph");
const paragraphModule = require("../../../../modules/quiz/paragraph")
const commonQuestionModule = require("../../../../modules/quiz/common_question")
const blankModule = require("../../../../modules/quiz/blank");
const constants = require("../../../../consts_folder/constants");
const CustomError = require("../../../../error/custom-error")

exports.easy = function(req,res){
  res.sendFile(dirName + '/index.html');
}


exports.getChapterDetailInfo = async(req,res) =>{
  let chapterId = req.params.chapterId
  let json = new Object()

  let [row]= await englishParagraphService.getParagraph(chapterId)

  json.code =200
  json.data = {
    paragraph : row[0].english_paragraph.replace(/\r\n/g," ").replace(/#/g," ") ,
    translation : row[0].english_paragraph_translation.replace(/\r\n/g," ").replace(/#/g, " ")
  }
  res.status(200).send(json)
}



exports.getChapterList = async(req,res) => {
  const [row]= await englishParagraphService.getChapterList()
  let jObj = new Object()

  jObj.code =200
  jObj.data = row
  res.send(jObj)
  // console.log('User ChapterList select success')
}

exports.getChapterRank = async(req,res) => {
  const [rows]= await englishParagraphService.getChapterRanks()
  let jObj = new Object()

  jObj.code =200
  jObj.data =rows
  res.send(jObj)

  // console.log('User ChapterRank select success')
}

exports.getWordSearch = async(req,res) => {
  let word = req.query.word
  const dictionaryResult= await englishParagraphService.getWordSearch(word)

  let jObj = new Object()
  jObj.code =200
  jObj.data = {
    word : word,
    dictionaryResult : dictionaryResult
  }

  res.send(jObj);
  // console.log('User WordSearch select success')
}



exports.getQuestion = async (req,res) =>{

  let chapterId = req.params.chapterId
  let blankDifficulty = req.query.blankDifficulty
  if(blankDifficulty!="easy" && blankDifficulty!="normal" && blankDifficulty!= "hard"){
    throw new CustomError(400,"잘못된 요청")
  }

  let roundCount =5

  let randomNumList = []
  let quizArray =[]

  let [row]= await englishParagraphService.getParagraph(chapterId)
  await englishParagraphService.changeParagraphPlayCount(chapterId)
  let paragraph = row[0].english_paragraph.replace(/\r\n/gi," ")
  let translation = row[0].english_paragraph_translation

  let questionParagraphList = paragraph.split("#")
  let questionTranslationList =translation.split("#")

  let arr =[]
  for (i in questionParagraphList){
    arr.push(i)
  }

  for (i=0;i<roundCount;i++){
    randomNum = Math.floor(Math.random() * arr.length)
    randomNumList.push(arr[randomNum])
    arr.splice(randomNum,1)
  }

  for (num of randomNumList){

    let questionParagraph = questionParagraphList[num]
    let questionTranslation = questionTranslationList[num]

    let blankWords = null
    switch(blankDifficulty){
      case "easy" :
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.easyMaxBlank,constants.easyMinLength)
        break
      case "normal" :
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.normalMaxBlank,constants.normalMinLength)
        break
      case "hard":
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.hardMaxBlank,constants.hardMinLength)
        break
    }
    let blankWordIndexes = await blankModule.getBlankPositions(blankWords,questionParagraph)

    //
    // console.log("questionParagraph:",questionParagraph)
    // console.log("blankWords:",blankWords)
    // console.log("blankWordsIndexes:",blankWordIndexes)

    // for(index of blankWordIndexes ){
    //   console.log("word:",questionParagraph.substring(index.startIndex,index.endIndex))
    // }

    let question ={
      questionParagraph : questionParagraph,
      translation : questionTranslation,
      blankWords:blankWords,
      blankWordsIndexes: blankWordIndexes
    }
    quizArray.push(question)
  }
  // console.log("문제출제")

  let jObj = new Object()
  jObj.code =200
  jObj.data = quizArray

  res.status(200).send(jObj)

}
