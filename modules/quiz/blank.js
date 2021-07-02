const commonQuestionModule = require("./common_question")
const constants = require("../../consts_folder/constants");
const excludeWord = ['Hello','I\'m', 'in', 'cook', 'you', 'I', 'Addae','the','she', 'he', 'my', 'this', 'that', 'day', 'to'];

exports.createRandomBlankWords = async (paragraph) =>{

    let tmpStr = await removeSpecialSymbol(paragraph)
    tmpStr = await excludeFilterWork(tmpStr)
    let blank = []

    let randomNumList = []

    while (randomNumList.length < constants.maxBlank) {

      let rand_0_length = await commonQuestionModule.randomNumRangeListLen(tmpStr)
      if (randomNumList.indexOf(rand_0_length) == -1)
        randomNumList.push(rand_0_length)

    }
    randomNumList = await commonQuestionModule.sortAsc(randomNumList)

    for (i in randomNumList) {
      if (blank.indexOf(tmpStr[randomNumList[i]]) == -1 && tmpStr[randomNumList[i]].length > 1)
        blank.push(tmpStr[randomNumList[i]])
    }
    return blank
}

exports.setBlanks = async (searchValue, paragraph) =>{

  let position =await searchPositionWord(searchValue,paragraph)
  let blankChars=await setBlankChars(position.length)
  let questionParagraph= await replaceAt(paragraph,position.startIndex,position.endIndex,blankChars)
  return questionParagraph
}

async function searchPositionWord (searchValue, paragraph){
  let searchValueLength = searchValue.length

  startIndex=paragraph.indexOf(searchValue)

  while(true){
    //case first word match
    if(startIndex==0)
      break

    else if(paragraph[startIndex-1]==" ")
      break

    else
      startIndex =paragraph.indexOf(searchValue,startIndex+1)

  }

  endIndex=startIndex+searchValueLength

  let position ={
    startIndex: startIndex ,
    endIndex: endIndex ,
    length: searchValueLength
  }
  return position
}

async function replaceAt(paragraph,startIndex,endIndex,blankChars){
    return paragraph.substr(0,startIndex) + blankChars + paragraph.substr(endIndex)
}



async function setBlankChars(searchValueLength){
    let blankChars=""
    for(let i=0;i<searchValueLength;i++)
        blankChars+="_"
    return blankChars
}


async function removeSpecialSymbol(paragraph){
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


async function excludeFilterWork (paragraph){
  let tmpStr = []
  for (i in excludeWord) {
    for (j in paragraph) {

      let index =tmpStr.indexOf(paragraph[j])
      if (excludeWord[i] != paragraph[j] && paragraph[j].length>1 && index==-1)
        tmpStr.push(paragraph[j])
        //tmpStr duplication remove
      else if(index!=-1){
        tmpStr.splice(index,1)
      }
    }
    paragraph = tmpStr
    tmpStr = []
  }
  return paragraph
}
