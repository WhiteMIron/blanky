exports.isRightAnswer = async (answer,multipleChoiceQuestions,blankWords) =>{

      let result ={}
      let rightAnswer =blankWords[0].slice()
      let tmpMultipleChoiceQuestions = multipleChoiceQuestions.slice()
      let tmpBlankWords = blankWords.slice()
      console.log("정답:",rightAnswer, "선택:",tmpMultipleChoiceQuestions[answer])

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
