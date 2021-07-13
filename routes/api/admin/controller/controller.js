
const englishParagraphService = require("../../../../services/english_paragraph");
const paragraphModule = require("../../../../modules/quiz/test_paragraph")
exports.registerParagraph = async (req,res)=>{

    let registerJson = req.body
    let chapterName = registerJson.chapterName
    let difficulty = registerJson.difficulty
    let cutLength = registerJson.cutLength
    let paragraph = registerJson.paragraph
    let translation = registerJson.translation


    await englishParagraphService.registerParagraph(chapterName,paragraph,translation,cutLength,difficulty)

    console.log("등록 완료")

    res.status(201).send("등록 완료")
}

//길이 정보도 있어야하나?
exports.changeParagraph = async(req,res) =>{
    let changeJson = req.body
    let paragraphId = req.params.paragraphId
    let cutLength = changeJson.cutLength

    let [row] = await englishParagraphService.getParagraph(paragraphId)
    let paragraph = row[0].english_paragraph.replace("#"," ")
    let translation = row[0].english_paragraph_translation.replace("#"," ")

    console.log("paragraph:",paragraph)
    console.log("paragraph:",translation)

    await englishParagraphService.changeParagraph(paragraph, translation, cutLength, paragraphId)
    console.log("챕터 지문 및 해석 길이 변경 완료")
    res.status(201).send("변경 완료")

}

exports.changeParagraphDifficulty = async(req,res) =>{
    console.log("요청 들어옴")
    console.log(req.body)
    let changeJson = req.body
    let paragraphId = req.params.paragraphId
    let difficulty = changeJson.difficulty

    console.log(" difficulty:", difficulty)
    await englishParagraphService.changeParagraphDifficulty(paragraphId, difficulty)
    console.log("챕터 난이도 변경 완료")
    res.status(201).send("변경 완료")

}