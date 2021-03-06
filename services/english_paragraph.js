const queries = require("../sql/english_paragraph")
const paragraphModule = require("../modules/quiz/paragraph")
const request = require('request-promise');


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



exports.getChapterList =async ()=>{
  rows = await queries.findChapterList()
  return rows
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

exports.changeParagraphPlayCount = async (paragraphId)=>{
  await queries.modifyPlayCount(paragraphId)
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


exports.getWordSearch =async (word)=>{
  const options ={
    url: `https://dict.naver.com/api3/enko/search?query='${word}'`,
    method: `GET`,
    encoding: null
  };
  const body= await request(options)
  const json = JSON.parse(body)
  var resultJsonArray = new Array();
  var typeFormLength = json.searchResultMap.searchResultListMap.WORD.items.length

  for (var j = 0; j < typeFormLength; j++) {
    let meansCollector =json.searchResultMap.searchResultListMap.WORD.items[j].meansCollector[0]
    var meansLength = meansCollector.means.length
    if (json.searchResultMap.searchResultListMap.WORD.items[j].expDictTypeForm == '단어') {
      for (var i = 0; i < meansLength; i++) {
        if (meansCollector.means[i].exampleOri != null
          && meansCollector.means[i].exampleTrans != null) {
          var partOfSpeech = meansCollector.partOfSpeech + ': '
            + meansCollector.means[i].value.replace(/\<strong>/g, '').replace(/\<\/strong>/g, '').replace(/\<span class='related_word' lang='en' >/g, '').replace(/\<\/span>/g, '').replace('&lt;', '<').replace('&gt;', '>')
          var exampleOri = meansCollector.means[i].exampleOri.replace(/\<strong>/g, '').replace(/\<\/strong>/g, '')
          var exampleTrans = meansCollector.means[i].exampleTrans.replace(/\<strong>/g, '').replace(/\<\/strong>/g, '')
          resultJsonArray.push(
            {
              partOfSpeech: partOfSpeech,
              exampleOri: exampleOri,
              exampleTrans: exampleTrans
            }
          )
        }
      }
    }
  }
  console.log(resultJsonArray)
  return resultJsonArray
}
