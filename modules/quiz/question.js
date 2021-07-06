const englishParagraphService = require("../../services/english_paragraph");
const blankModule = require("./blank")
const commonQuestionModule = require("./common_question")
const paragraphModule = require("./paragraph")
const multipleChoiceQuestionsModule = require("./multiple_choice_questions")


exports.createQuestion =async () =>{

    let [paragraphRow] = await englishParagraphService.getParagraph(2)
    let rand_0_length= await commonQuestionModule.randomNumRangeListLen(paragraphRow)
    let paragraphId = paragraphRow[rand_0_length].id
    let paragraph = paragraphRow[rand_0_length].english_paragraph

    let questionParagraphList = await paragraphModule.splitParagraphBaseDot(paragraph)
    // console.log(questionParagraphList)
    let questionParagraph = await paragraphModule.randomParagraph(questionParagraphList)
    // let [translationRow] = await englishParagraphService.getTranslation(paragraphId)
    // let questionTranslationList = translationRow[0].english_translation.split("#")
    // let questionTranslation = questionTranslationList[questionParagraphList.indexOf(questionParagraph)]
    
    
   
    let blankWords = await blankModule.createRandomBlankWords(questionParagraph)
    questionTranslation =""
    let originalParagraph = questionParagraph
    questionParagraph= await createQuestion(blankWords,questionParagraph)
    let randomNumList = await mixNumList(blankWords)
    let multipleChoiceQuestions= await multipleChoiceQuestionsModule.createMultipleChoiceQuestions(blankWords,randomNumList)
    let question ={
      originalParagraph : originalParagraph,
      paragraph : questionParagraph,
      translation : questionTranslation,
      multipleChoiceQuestions :multipleChoiceQuestions,
      blankWords:blankWords
    }
    return question

}


async function createQuestion(blankWords,questionParagraph){
    for(i in blankWords){
        questionParagraph=await blankModule.setBlanks(blankWords[i],questionParagraph)
    }
    return questionParagraph
}


async function mixNumList (numList){
  let randomNumList = []
  let rand_0_length
  while (randomNumList.length < numList.length) {
     rand_0_length = await commonQuestionModule.randomNumRangeListLen(numList)
     if (randomNumList.indexOf(rand_0_length) == -1)
       randomNumList.push(rand_0_length)
  }
  return randomNumList
}

//
// async function printQuestion(blanks,questionParagraph,questionTranslation){
//     console.log("문제:",[questionParagraph])
//     console.log("해석:",[questionTranslation])
// }
