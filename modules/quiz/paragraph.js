const _ = require("lodash");
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

  exports.splitParagraphBaseDot = async (paragraph,translation,cutLength) =>{
    // let questionParagraphList = []
    let tmp = []
    paragraph = paragraph.split(".")
    paragraph = await splitParagraphBaseQuestionMark(paragraph)
    paragraph = await splitParagraphBaseExclamationMark(paragraph)

    translation = translation.split(" ")
    var index = 0
    let questionParagraphs =[]
    let addSharpParagraphs=[]


    for (var i in paragraph) {
      //  value init for dynamic array
      if (questionParagraphs[index] == undefined)
          questionParagraphs[index] = ""

      paragraph[i][0]= paragraph[i][0].replace(/\r\n/gi," ")

        // case "word." , "word?", "word!"
      if ( paragraph[i][0][0]=='"'||paragraph[i][0][1]=='"' && paragraph[i][0][paragraph[i][0].length-1]!='"'){
          if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
            paragraph[i][0]+='."'
            questionParagraphs[index] += paragraph[i]
          }
          else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
            paragraph[i][0]+='!"'
            questionParagraphs[index] += paragraph[i]
          }
          else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
            paragraph[i][0]+='?"'
            questionParagraphs[index] += paragraph[i]
          }
      }

      else if(paragraph[i][0][0]=='"' &&paragraph[i][0][1]==" "){
        paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
        questionParagraphs[index] += paragraph[i]
      }

      //case (word.), (word!), (word?)
      else if (paragraph[i][0][1]=='(' && paragraph[i][0][paragraph[i][0].length-1]!=')'){
        if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
          paragraph[i][0]+=".)"
          questionParagraphs[index] += paragraph[i]
        }
        else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
          paragraph[i][0]+="!)"
          questionParagraphs[index] += paragraph[i]
        }
        else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
          paragraph[i][0]+="?)"
          questionParagraphs[index] += paragraph[i]
        }
      }
      else if(paragraph[i][0][0]==')' && paragraph[i][0][1]==" "){
        paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
        questionParagraphs[index] += paragraph[i]
      }


      // paragraph length>0 and !end , end == !'?', end == !'!'
      else if (paragraph[i] && i != paragraph.length - 1 && paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!") {
        questionParagraphs[index] += paragraph[i] + "."
      }
      // case : ...
      else if (!paragraph[i] && i != paragraph.length - 1) {
        questionParagraphs[index] += "."
      }
      // case : end ==? OR !
      else {
        questionParagraphs[index] += paragraph[i]
      }
      if (questionParagraphs[index].length > cutLength) {
        // console.log(questionParagraphs[index], questionParagraphs[index].length)
        questionParagraphs[index]=questionParagraphs[index].trim()
        addSharpParagraphs+= questionParagraphs[index]+"#"
        index ++
      }
    }
    if(questionParagraphs[index].length<cutLength){
        questionParagraphs[index-1]+=questionParagraphs[index]
        addSharpParagraphs=addSharpParagraphs.substr(0,addSharpParagraphs.lastIndexOf("#"))
        addSharpParagraphs+= questionParagraphs[index]
        questionParagraphs.pop()
      }

      let questionTranslations = []
      let addSharpTranslations=[]
      index =0


  for(paragraph of questionParagraphs){

    let dotCount = paragraph.match(/\./g) != null ? paragraph.match(/\./g).length:0;
    let questionMarkCount = paragraph.match(/\?/g) != null ? paragraph.match(/\?/g).length:0;
    let exclamationMarkCount = paragraph.match(/\!/g) != null ? paragraph.match(/\!/g).length:0;

    tmp = _.cloneDeep(translation)
    for( i in translation){
      if (questionTranslations[index] == undefined){
          questionTranslations[index] = ""
      }
        //  console.log("dotCount:",dotCount, "questionMarkCount:",questionMarkCount, "exclamationMarkCount:",exclamationMarkCount)
         translationDotCount = questionTranslations[index].match(/\./g) != null ?  questionTranslations[index].match(/\./g).length:0;
         translationQuestionMarCount = questionTranslations[index].match(/\?/g) != null ?  questionTranslations[index].match(/\?/g).length:0
         translationExclamationMarkCount = questionTranslations[index].match(/\!/g) != null ?  questionTranslations[index].match(/\!/g).length:0

         if(dotCount == translationDotCount && questionMarkCount == translationQuestionMarCount && exclamationMarkCount ==translationExclamationMarkCount){
           questionTranslations[index]=questionTranslations[index].trim()
           addSharpTranslations += questionTranslations[index].trim()+"#"
           index++
           break
         }
          else{
            questionTranslations[index]+= translation[i]+" "
          }
          tmp.shift()
    }
    translation = _.cloneDeep(tmp)
 }
  addSharpTranslations += questionTranslations[index].trim()
  questionInfo ={
    addSharpParagraphs : addSharpParagraphs,
    addSharpTranslations: addSharpTranslations
  }
  return questionInfo
}


  exports.getParagraph= (paragraphList,index)=> {  // 인자랑 리스트를 같이 넣기나?
    let questionParagraph = paragraphList[index]
    return questionParagraph.trim()
  }

  exports.randomParagraph2= (paragraphList)=> {
    let rand_0_length = Math.floor(Math.random() * paragraphList.length)
    let questionParagraph = paragraphList[rand_0_length]
    return questionParagraph.trim()
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
