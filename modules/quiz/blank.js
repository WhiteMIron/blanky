const commonQuestionModule = require("./common_question")
const constants = require("../../consts_folder/constants");
const excludeWords =
["Info","Min","Jisu","Mrs","or","The","the","and","And","USA","JK","UK"
,"Hi",'an','She','she','He','he','Hello', 'in', 'cook','her', 'you'
,'Addae','the','she', 'he', 'my', 'this', 'that', 'day', 'to','They',
'Jiwon','Jihun',"Minsu","Kelly","Addae","Jihun","Hmm","one","pm","am","th","nd",
"at","At","of","This","That","your","Your","you","You","is","are","Are","Is","be",
"these",'There',"there","These","they","They","our","Our","than","it","It","three",
"their","Their","was","we","We","his","were","Then","then","korea","Korea","Mom","mom",
"one","One","First","second","But","but","mother","very","do","month","today","Today","Dad","did","First",
"mother","Mother","All","all","Her","Now","now","Oh","two","korean","Here","here","jeon","Korean","How","how",
"me","garaetteok","tteokbokki","Ghana","Do","Kazim","My","them","Turky","Anansi","Turtle","Its","its","Kakadu",
"Step","Spain","Iguazu"
];
const excludeSymbols = ['-',`'`]
//명사 동사 전치사 이렇게 빈칸 구성할 수도?

exports.createRandomBlankWords = async (paragraph,maxBlank,minLength) =>{
    // console.log("originalParagraph:",paragraph)
    let tmpStr = await removeSpecialSymbol(paragraph)
    tmpStr = await excludeFilterWork(tmpStr,minLength)
    // console.log("tmpStr:",tmpStr)
    let randomNumList =[]
    // let arr =[]
    let blank = []

    for (i in tmpStr){
        randomNumList.push(i)
    }

    // console.log("셔플 전 randomNumList:",randomNumList)
    // console.log("randomNumList len:",randomNumList.length)
    shuffle(randomNumList)
    randomNumList=randomNumList.slice(0,10)
    // console.log("randomNumList len:",randomNumList.length)
    shuffle(randomNumList)
    randomNumList=randomNumList.slice(0,4)
    randomNumList = await commonQuestionModule.sortAsc(randomNumList)
    // console.log("randomNumList:",randomNumList)

    for (i=0;i<maxBlank;i++){
      blankWord = tmpStr[randomNumList[i]]
      blank.push(blankWord)
    }

    // for (i=0;i<maxBlank;i++){
    //   randomNum = Math.floor(Math.random() * arr.length)
    //   randomNumList.push(arr[randomNum])
    //   arr.splice(randomNum,1)
    // }
    // randomNumList = await commonQuestionModule.sortAsc(randomNumList)


    // for (i in randomNumList) {
    //     blankWord = tmpStr[randomNumList[i]]
    //     blank.push(blankWord)
    // }

    return blank
}


exports.getBlankPositions = async (blankWords, paragraph) =>{
  let blankWordPositions =[]
  for( word of blankWords){
    let position =await searchPositionWord(word,paragraph)
    blankWordPositions.push(position)
  }
  return  blankWordPositions
}


exports.setBlanks = async (searchValue, paragraph) =>{
  let position =await searchPositionWord(searchValue,paragraph)
  let blankChars=await setBlankChars(position.length)
  let questionParagraph= await replaceAt(paragraph,position.startIndex,position.endIndex,blankChars)
  return questionParagraph
}

async function searchPositionWord (searchValue, paragraph){

  // console.log("paragraph:",paragraph)
  // console.log("searchValue:",searchValue)
  let searchValueLength = searchValue.length
  let startIndex = paragraph.indexOf(searchValue)

  while(true){

    // console.log("searchValue:",searchValue)
    endIndex=startIndex+searchValueLength
    index = endIndex
    // console.log("substring:",paragraph.substring(startIndex,endIndex))
    // console.log("paragraph[index]==' '",paragraph[index]==" ")

    if( searchValue==paragraph.substring(startIndex,endIndex) && (paragraph[index]=="" || paragraph[index]==" " || paragraph[index]=="," || paragraph[index]=="?" ||paragraph[index]=="!" || paragraph[endIndex]=="." ||  paragraph[endIndex]=='"' ||  paragraph[endIndex]==')' || paragraph[endIndex]==':' ||  paragraph[endIndex]=='”')){
      if(startIndex!=0 && paragraph[startIndex-1]!=" " && paragraph[startIndex-1]!='"' && paragraph[startIndex-1]!='(' && paragraph[startIndex-1]!='“'){

        startIndex =paragraph.indexOf(searchValue,endIndex+1)
        continue

      }
      break
    }
    else{
      startIndex =paragraph.indexOf(searchValue,startIndex+searchValueLength+1)
    }
  }
  let position ={
    startIndex: startIndex ,
    endIndex: endIndex ,
  }
  // console.log("여기 걸림4",position)
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
    tmpStr = paragraph.replace(/’/gi,"'")
    tmpStr = tmpStr.replace(/”/gi,"")
    tmpStr = tmpStr.replace(/“/gi,"")
    tmpStr = tmpStr.replace(/,/gi, "")
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


async function excludeFilterWork (paragraphWords,minLength){
  let tmp = []
  for (pWord of paragraphWords) {
        if(pWord.length>minLength){
          let index =excludeWords.indexOf(pWord)
          if(index == -1){
            for (symbol of excludeSymbols){
              index  = pWord.indexOf(symbol)
              if(index != -1)
                break
              }
              if(index == -1){
                index= tmp.indexOf(pWord)
                if(index == -1){
                  tmp.push(pWord)
                }
              }
            }
          }
  }
  paragraphWords =tmp

  return paragraphWords
}


function shuffle(array){
  for(let index = array.length -1; index>0; index--){
      const randomPosition = Math.floor(Math.random()* (index+1));
      const temporary  = array[index];

      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
}
