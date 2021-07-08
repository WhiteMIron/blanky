const englishParagraphService = require("./services/english_paragraph");
(async()=>{
    let chapterId = 1
    let json = new Object()
  
    let [row]= await englishParagraphService.getParagraph(chapterId)
 
    json.code =200
    json.data = {
      paragraph : row[0].english_paragraph.replace(/\r\n/gi," ") ,
      translation : row[0].english_paragraph_translation.replace(/\#/gi, " ")
    }
    console.log(json)
  })()

  