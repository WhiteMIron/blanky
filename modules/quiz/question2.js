const englishParagraphService = require("../../services/english_paragraph");
const blankModule = require("./blank")
const commonQuestionModule = require("./common_question")
const paragraphModule = require("./paragraph")
const multipleChoiceQuestionsModule = require("./multiple_choice_questions")


exports.createQuestion =async () =>{

    let [paragraphRow] = await englishParagraphService.getParagraphs(1)
    let rand_0_length= await commonQuestionModule.randomNumRangeListLen(paragraphRow)
    let paragraphId = paragraphRow[rand_0_length].id
    let paragraph = paragraphRow[rand_0_length].english_paragraph

    let questionParagraphList = await paragraphModule.splitParagraphBaseDot(paragraph)
    let questionParagraph = await paragraphModule.randomParagraph(questionParagraphList)
    let [translationRow] = await englishParagraphService.getTranslation(paragraphId)

    let questionTranslationList = translationRow[0].english_translation.split("#")
    let blankWords = await blankModule.createRandomBlankWords(questionParagraph)
    let questionTranslation = questionTranslationList[questionParagraphList.indexOf(questionParagraph)]


    let originalParagraph = questionParagraph
    questionParagraph= await createQuestion(blankWords,questionParagraph)

    // let randomNumList = await mixNumList(blankWords)
    // let multipleChoiceQuestions= await multipleChoiceQuestionsModule.createMultipleChoiceQuestions(blankWords,randomNumList)

    let question ={
      originalParagraph : originalParagraph,
      paragraph : questionParagraph,
      translation : questionTranslation,
      // multipleChoiceQuestions :multipleChoiceQuestions,
      blankWords:blankWords
    }

    return question

}


async function createQuestion(blankWords,questionParagraph){
    for(i in blankWords)
        questionParagraph=await blankModule.setBlanks(blankWords[i],questionParagraph)
    return questionParagraph
}
