const queries = require("../sql/english_paragraph")

exports.getParagraphs =async (difficulty)=>{
  rows = await queries.findByParagraphDifficulty(difficulty)
  return rows
}

exports.getParagraph=async (chapterId)=>{
  row = await queries.findByParagraphId(chapterId)
  return row
}


exports.getTranslation =async (paragraphId)=>{
  rows = await queries.findByParagraphId(paragraphId)
  return rows
}


exports.plusPlayCount = async(chapterId)=>{

  await queries.modifyPlayCount(chapterId)

}

exports.getChapterRanks =async ()=>{
  rows = await queries.findChapterRanks()
  return rows
}




exports.registerParagraph = async(chapterName,paragraph,translation,cutLength,difficulty)=>{
  let quizInfo = await paragraphModule.splitParagraphBaseDot(paragraph,translation,cutLength)
  let addSharpParagraphs = quizInfo.addSharpParagraphs
  let addSharpTranslations = quizInfo.addSharpTranslations
  //#이 추가된 상황 
  console.log(quizInfo)
  await queries.saveParagraph(chapterName,addSharpParagraphs,addSharpTranslations,difficulty)
}

exports.changeParagraph = async(paragraph,translation,cutLength,paragraphId)=>{
  let quizInfo = await paragraphModule.splitParagraphBaseDot(paragraph,translation,cutLength)
  let addSharpParagraphs = quizInfo.addSharpParagraphs
  let addSharpTranslations = quizInfo.addSharpTranslations
  
  console.log("quizInfo:",quizInfo)
  await queries.modifyParagraph(addSharpParagraphs,addSharpTranslations,paragraphId)
}

exports.changeParagraphDifficulty = async(paragraphId, difficulty)=>{
  await queries.modifyParagraphDifficulty(paragraphId, difficulty)
}