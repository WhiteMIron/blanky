exports.removeSpecialSymbol =async (paragraph) =>{

  paragraph = paragraph.trim()
  tmpStr = paragraph.replace(/,/gi, "")
  tmpStr = tmpStr.replace(/\?/gi, "")
  tmpStr = tmpStr.replace(/!/gi, "")
  tmpStr = tmpStr.replace(/\./gi, "")
  tmpStr = tmpStr.replace(/\:/gi, "")
  tmpStr = tmpStr.replace(/\r\n/gi, "")

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

    paragraph[i][0]= paragraph[i][0].replace(/\r\n/gi," ")

      // case "word." , "word?", "word!"
    if ( paragraph[i][0][0]=='"'||paragraph[i][0][1]=='"' && paragraph[i][0][paragraph[i][0].length-1]!='"'){
        if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
          paragraph[i][0]+='."'
          questionParagraphList[index] += paragraph[i]
        }
        else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
          paragraph[i][0]+='!"'
          questionParagraphList[index] += paragraph[i]
        }
        else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
          paragraph[i][0]+='?"'
          questionParagraphList[index] += paragraph[i]
        }
    }

    else if(paragraph[i][0][0]=='"' &&paragraph[i][0][1]==" "){
      paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
      questionParagraphList[index] += paragraph[i]
    }

    //case (word.), (word!), (word?)
    else if (paragraph[i][0][1]=='(' && paragraph[i][0][paragraph[i][0].length-1]!=')'){
      if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
        paragraph[i][0]+=".)"
        questionParagraphList[index] += paragraph[i]
      }
      else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
        paragraph[i][0]+="!)"
        questionParagraphList[index] += paragraph[i]
      }
      else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
        paragraph[i][0]+="?)"
        questionParagraphList[index] += paragraph[i]
      }
    }
    else if(paragraph[i][0][0]==')' && paragraph[i][0][1]==" "){
      paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
      questionParagraphList[index] += paragraph[i]
    }

    // paragraph length>0 and !end , end == !'?', end == !'!'
    else if (paragraph[i] && i != paragraph.length - 1 && paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!") {
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
    if (questionParagraphList[index].length > 100) {
      // console.log(questionParagraphList[index], questionParagraphList[index].length)
      questionParagraphList[index]=questionParagraphList[index].trim()
      index += 1
    }

    }


    questionParagraphList.pop()
    return questionParagraphList
  }


exports.getParagraph= (paragraphList,index)=> {  // 인자랑 리스트를 같이 넣기나?
  let questionParagraph = paragraphList[index]
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
