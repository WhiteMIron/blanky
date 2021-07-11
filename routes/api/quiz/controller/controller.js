const dirName ="C:\\Users\\user\\Documents\\작업공간\\V11\\views"

const englishParagraphService = require("../../../../services/english_paragraph");
const paragraphModule = require("../../../../modules/quiz/paragraph")
const commonQuestionModule = require("../../../../modules/quiz/common_question")
const blankModule = require("../../../../modules/quiz/blank");
const constants = require("../../../../consts_folder/constants");
exports.upper = function(req,res){
  res.sendFile(dirName + '/index.html');
}

exports.middle = function(req,res){
  res.sendFile(dirName + '/index2.html');
}

exports.lower = function(req,res){
  res.sendFile(dirName + '/index3.html');
}


exports.getChapterInfo = async (req,res)=>{

let difficulty = req.params.difficulty
let jsonArray = new Array()

let [rows] = await englishParagraphService.getChapters(difficulty)
for(row of rows){
  chapter={
    id: row.id,
    chapterName: row.english_paragraph_chapter_name,
    chapterImg : row.english_paragraph_chapter_img,
    playCount : row.english_paragraph__play_count
  }
  jsonArray.push(chapter)
}

let jObj = new Object()
jObj.code = 200
jObj.data = jsonArray

console.log(jObj)

res.status(201).send(jObj)
}


exports.getChapterDetailInfo = async(req,res) =>{
  let chapterId = req.params.chapterId
  let json = new Object()

  let [row]= await englishParagraphService.getParagraph(chapterId)

  json.code =200
  json.data = {
    paragraph : row[0].english_paragraph.replace(/\r\n/gi," ") ,
    translation : row[0].english_paragraph_translation.replace(/\#/gi, " ")
  }
  res.status(200).send(json)
}


exports.getChapterRank = async(req,res) => {
  const [rows]= await englishParagraphService.getChapterRanks()
  let jObj = new Object()
  
  jObj.code =200
  jObj.data =rows
  res.send(jObj)
  
  console.log('User ChapterRank select success')
}


exports.getQuestion = async (req,res) =>{
  console.log("요청")
  let chapterId = req.params.chapterId
  let difficulty = req.query.difficulty
  
  let roundCount =3
  
  let randomNumList = []
  let quizArray =[] 
 
  let [row]= await englishParagraphService.getParagraph(chapterId)
  console.log(row)
  let paragraph = row[0].english_paragraph.replace(/\r\n/gi," ")
  let translation = row[0].english_paragraph_translation

  let questionParagraphList = await paragraphModule.splitParagraphBaseDot(paragraph)
  let questionTranslationList =translation.split("#")


  let arr =[]
  for (i in questionParagraphList){
    arr.push(i)
  }
  rand_0_length= await commonQuestionModule.randomNumRangeListLen(questionParagraphList.length)

  for (i=0;i<roundCount;i++){
    randomNum = Math.floor(Math.random() * arr.length)
    randomNumList.push(arr[randomNum])
    arr.splice(randomNum,1)
  }

  for (num of randomNumList){

    let questionParagraph = await paragraphModule.getParagraph(questionParagraphList,num)
    let questionTranslation = questionTranslationList[num]
    let blankWords = null
    switch(difficulty){
      case "1" :
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.easyMaxBlank)
        break
      case "2" :
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.normalMaxBlank)
        break
      case "3":
        blankWords = await blankModule.createRandomBlankWords(questionParagraph,constants.hardMaxBlank)
        break
    } 
    let blankWordIndexes = await blankModule.getBlankPositions(blankWords,questionParagraph)
    
    let question ={
      questionParagraph : questionParagraph,
      translation : questionTranslation,
      blankWords:blankWords,
      blankWordsIndexes: blankWordIndexes
    }
    quizArray.push(question)
  }
  let jObj = new Object()
  jObj.code =200
  jObj.data = quizArray

  res.status(200).send(jObj)
}

