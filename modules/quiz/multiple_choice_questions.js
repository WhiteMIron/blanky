exports.createMultipleChoiceQuestions = async (blanks,randomNumList) =>{
  let multipleChoiceQuestions =[]

  for(i=0;i<randomNumList.length;i++){
      multipleChoiceQuestions.push(blanks[randomNumList[i]])
  }
  return multipleChoiceQuestions
}

exports.printMultipleChoiceQuestions = async (multipleChoiceQuestions)=>{

  for(i=0;i<multipleChoiceQuestions.length;i++)
    console.log(i+1,"번 보기:",multipleChoiceQuestions[i])
}
