const englishParagraphService = require("../../services/english_paragraph");
const blankModule = require("./blank")
const commonQuestionModule = require("./common_question")
const paragraphModule = require("./paragraph")

exports.setParagraphs=async (room,difficulty,roundCount)=>{
  // let [paragraphRow] = await englishParagraphService.getParagraphs(difficulty)
  let [paragraphRow] = await englishParagraphService.getParagraphs(difficulty)

  let rand_0_length = await commonQuestionModule.randomNumRangeListLen(paragraphRow.length)  // 여러 챕터 중 한 개의 챕터
  let paragraph = paragraphRow[rand_0_length].english_paragraph
  let translation =paragraphRow[rand_0_length].english_paragraph_translation

  // await englishParagraphService.changeParagraphPlayCount(rand_0_length+1)

  let paragraphs = paragraph.split("#")
  let translations = translation.split("#")

  let questionParagraphs = []
  let questionTranslations = []
  let randomNumList = []


  let arr =[]
  for (i in paragraphs){
    arr.push(i)
  }
  // rand_0_length= await commonQuestionModule.randomNumRangeListLen(paragraphs.length)
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




exports.createQuestion =async (room,questionParagraphs,questionTranslations,maxBlank,minLength) =>{
  questionParagraph = questionParagraphs[0]
  questionTranslation = questionTranslations[0]

  if(questionParagraphs.length!=1){
    room.questionParagraphs=questionParagraphs.slice(1,questionParagraphs.length)
    room.questionTranslations=questionTranslations.slice(1,questionTranslations.length)

  }
 console.log("blankWords전")
 let blankWords = await blankModule.createRandomBlankWords(questionParagraph,maxBlank,minLength)
 console.log("blankWordsIndexes전")
 let blankWordIndexes = await blankModule.getBlankPositions(blankWords,questionParagraph)
 console.log("blankWordsIndexes후")
  let question ={
    questionParagraph : questionParagraph,
    questionTranslation : questionTranslation,
    blankWords:blankWords,
    blankWordsIndexes: blankWordIndexes
  }
  return question
}
