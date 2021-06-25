exports.isRightAnswer = async (answer,multipleChoiceQuestions,blankWords) =>{

      let result ={}
      let rightAnswer =blankWords[0].slice()
      let tmpMultipleChoiceQuestions = multipleChoiceQuestions.slice()
      let tmpBlankWords = blankWords.slice()

      if(rightAnswer == tmpMultipleChoiceQuestions[answer]){
        tmpMultipleChoiceQuestions.splice(answer,1)
        tmpBlankWords.shift()

        result["isRight"] =true
        result["multipleChoiceQuestions"] =tmpMultipleChoiceQuestions
        result["blankWords"] = tmpBlankWords
      }
      else {
        result["isRight"] =false
        result["multipleChoiceQuestions"] =tmpMultipleChoiceQuestions
        result["blankWords"] = tmpBlankWords

      }

      return result
}
