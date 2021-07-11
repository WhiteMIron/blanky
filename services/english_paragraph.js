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
