const commonQuestionModule = require("./common_question")
const constants = require("../../consts_folder/constants");
const excludeWords = ['Hello', 'in', 'cook', 'you', 'Addae','the','she', 'he', 'my', 'this', 'that', 'day', 'to'];

//명사 동사 전치사 이렇게 빈칸 구성할 수도?

exports.createRandomBlankWords = async (paragraph) =>{
    console.log("originalParagraph:",paragraph)
 
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
    console.log(blank)
    return blank
}

exports.setBlanks = async (searchValue, paragraph) =>{
  let position =await searchPositionWord(searchValue,paragraph)
  let blankChars=await setBlankChars(position.length)
  let questionParagraph= await replaceAt(paragraph,position.startIndex,position.endIndex,blankChars)
  return questionParagraph
}

async function searchPositionWord (searchValue, paragraph){

  console.log("paragraph:",paragraph)
  console.log("searchValue:",searchValue)
  let searchValueLength = searchValue.length
  let startIndex = paragraph.indexOf(searchValue) 
 
  while(true){
    
    endIndex=startIndex+searchValueLength
    index = endIndex
    console.log("substring:",paragraph.substring(startIndex,endIndex))
    console.log("paragraph[index]==' '",paragraph[index]==" ")
    break
    if( searchValue==paragraph.substring(startIndex,endIndex) && (paragraph[index]=="" || paragraph[index]==" " || paragraph[index]=="," || paragraph[index]=="?" ||paragraph[index]=="!" || paragraph[endIndex]=="." ||  paragraph[endIndex]=='"' ||  paragraph[endIndex]=='(' )){
      // console.log("여기 걸림0")
      if(startIndex!=0 && paragraph[startIndex-1]!=" " && paragraph[startIndex-1]!='"' && paragraph[startIndex-1]!='('){
        startIndex =paragraph.indexOf(searchValue,endIndex+1)
        // console.log("여기 걸림1")
        continue

      }
      // console.log("여기 걸림2")
      break 
    }
    else{
      // console.log("여기 걸림3")
      startIndex =paragraph.indexOf(searchValue,startIndex+searchValueLength+1)
    }
  }

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
    for(let i=0;i<searchValueLength;i++){
      blankChars+="_"
    }
    return blankChars
}


async function removeSpecialSymbol(paragraph){
    paragraph = paragraph.trim()
    tmpStr = paragraph.replace(/,/gi, "")
    tmpStr = tmpStr.replace(/\?/gi, "")
    tmpStr = tmpStr.replace(/!/gi, "")
    tmpStr = tmpStr.replace(/\./gi, "")
    tmpStr = tmpStr.replace(/\:/gi, "")
    tmpStr = tmpStr.replace(/"/gi, "")
    tmpStr = tmpStr.replace(/\r\n/gi, "")
    tmpStr = tmpStr.replace(/\(/gi, "")
    tmpStr = tmpStr.replace(/\)/gi, "")
    tmpStr = tmpStr.replace(/[0-9]/g, "");

    tmpStr = tmpStr.split(" ")
    return tmpStr
}


async function excludeFilterWork (paragraphWords){
  let tmp = []
  for (pWord of paragraphWords) {
        if(pWord.length>1){
          index =excludeWords.indexOf(pWord)
          if (index == -1){
            index= tmp.indexOf(pWord)
            if(index == -1)
              tmp.push(pWord)
          } 
        }
  }
  paragraphWords =tmp

  return paragraphWords
}


