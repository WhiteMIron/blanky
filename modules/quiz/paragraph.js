
exports.removeSpecialSymbol =async (paragraph) =>{

  paragraph = paragraph.trim()
  tmpStr = paragraph.replace(/,/gi, "")
  tmpStr = tmpStr.replace(/\?/gi, "")
  tmpStr = tmpStr.replace(/!/gi, "")
  tmpStr = tmpStr.replace(/\./gi, "")
  tmpStr = tmpStr.replace(/\:/gi, "")
  tmpStr = tmpStr.replace(/\r\n/gi, "")
  // tmpStr = tmpStr.replace(/\\r\\n/gi, "")

  tmpStr = tmpStr.split(" ")
  return tmpStr
}

exports.splitParagraphBaseDot = async (paragraph) =>{
  let questionParagraphList = []
  let tmp = []

  paragraph = paragraph.split(".")
  paragraph = await splitParagraphBaseQuestionMark(paragraph)
  paragraph = await splitParagraphBaseExclamationMark(paragraph)

  var index = 0
  for (var i in paragraph) {
    //  value init for dynamic array
    if (questionParagraphList[index] == undefined)
      questionParagraphList[index] = ""
    // paragraph length>0 and !end , end == !'?', end == !'!'
    if (paragraph[i] && i != paragraph.length - 1 && paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!") {
      questionParagraphList[index] += paragraph[i] + "."
    }
    // case : ...
    else if (!paragraph[i] && i != paragraph.length - 1) {
      questionParagraphList[index] += "."
    }
    // case : end ==? OR !
    else {
      questionParagraphList[index] += paragraph[i]
    }
    if (questionParagraphList[index].length > 70) {
      // console.log(questionParagraphList[index], questionParagraphList[index].length)
      questionParagraphList[index]=questionParagraphList[index].trim()
      index += 1
    }

  }
  questionParagraphList.pop()
  return questionParagraphList
}


exports.randomParagraph= (paragraphList)=> {
  let rand_0_length = Math.floor(Math.random() * paragraphList.length)
  let questionParagraph = paragraphList[rand_0_length]
  return questionParagraph.trim()
}


async function splitParagraphBaseQuestionMark(paragraph) {
  let tmp = []

  for (i in paragraph) {
    paragraph[i] = paragraph[i].split("?")
    if (paragraph[i].length > 1) {
      for (j in paragraph[i]) {
        if (j % 2 == 0)
          paragraph[i][j] = paragraph[i][j] + "?"
        tmp.push([paragraph[i][j]])
      }
    } else
      tmp.push(paragraph[i])

  }
  return tmp
}


async function splitParagraphBaseExclamationMark(paragraph) {
  let tmp = []

  for (i in paragraph) {
    paragraph[i][0] = paragraph[i][0].split("!")

    if (paragraph[i][0].length > 1) {
      for (j in paragraph[i][0]) {
        if (j % 2 == 0)
          paragraph[i][0][j] = paragraph[i][0][j] + "!"
        tmp.push([paragraph[i][0][j]])
      }
    } else
      tmp.push(paragraph[i][0])
  }
  return tmp
}