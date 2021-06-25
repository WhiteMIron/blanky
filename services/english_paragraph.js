const pool = require("../config/database");
const queries = require("../sql/english_paragraph")

exports.getParagraph =async (difficulty)=>{
  rows = await queries.findByParagraphDifficulty(difficulty)
  return rows
}


exports.getTranslation =async (paragraphId)=>{
  rows = await queries.findByParagraphId(paragraphId)
  return rows
}
