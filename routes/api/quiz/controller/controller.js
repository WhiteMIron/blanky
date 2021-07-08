const dirName = "C:\\Users\\BS\\Documents\\카카오톡 받은 파일\\blankyV7 - 복사본\\views"
const englishParagraphService = require("../../../../services/english_paragraph");

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