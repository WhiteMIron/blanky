const englishParagraphService = require("../../services/english_paragraph");
const blankModule = require("./blank")
const commonQuestionModule = require("./common_question")
const paragraphModule = require("./paragraph")

exports.setParagraphs=async (room,difficulty,roundCount)=>{
  let [paragraphRow] = await englishParagraphService.getParagraphs(difficulty)

  let rand_0_length = await commonQuestionModule.randomNumRangeListLen(paragraphRow.length)  // 여러 챕터 중 한 개의 챕터
  let paragraph = paragraphRow[rand_0_length].english_paragraph
  let translation =paragraphRow[rand_0_length].english_paragraph_translation

  let paragraphs = paragraph.split("#")
  let translations = translation.split("#")

  let questionParagraphs = []
  let questionTranslations = []
  let randomNumList = []


  let arr =[]
  for (i in paragraphs){
    arr.push(i)
  }

  for (i=0;i<roundCount;i++){
    randomNum = Math.floor(Math.random() * arr.length)
    randomNumList.push(arr[randomNum])
    arr.splice(randomNum,1)
  }

  for (num of randomNumList){

      let questionParagraph = await paragraphModule.getParagraph(paragraphs,num)
      let questionTranslation = translations[num]

      questionParagraphs.push(questionParagraph)
      questionTranslations.push(questionTranslation)

  }
  room.questionParagraphs = questionParagraphs
  room.questionTranslations = questionTranslations
}




exports.createQuestion =async (room,questionParagraphs,questionTranslations,maxBlank,minLength,roundCount) =>{
 questionParagraph = questionParagraphs[roundCount-1]
 questionTranslation = questionTranslations[roundCount-1]

 let blankWords = await blankModule.createRandomBlankWords(questionParagraph,maxBlank,minLength)
 let blankWordIndexes = await blankModule.getBlankPositions(blankWords,questionParagraph)


 let question ={
    questionParagraph : questionParagraph,
    questionTranslation : questionTranslation,
    blankWords:blankWords,
    blankWordsIndexes: blankWordIndexes
  }
  return question
}
