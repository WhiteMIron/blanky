const _ = require("lodash");
const { getParagraph } = require("./modules/quiz/paragraph");
const englishParagraphService = require("./services/english_paragraph");
//db에 저장을 시켜보자 

//문장, 해석 덩어리, 길이 파라미터로 넘겨주면 문장이랑 해석 #구분자 추가해서 DB에 저장함

(async function(){
  let paragraph = 'Jiwon is my new Korean friend. Today, she will make tteokbokki for me. But she doesn’t have any garaetteok at her house. We should visit a traditional market and buy some garaetteok. I can’t wait! This is a traditional market. We can buy things at low prices. People are very busy. What is the woman cooking? She’s making jeon. It’s delicious. What is the store selling? People are standing in line! That’s a famous chicken store. Oh, I see. This place is so interesting! Great. Now, let’s visit Jang’s rice cake store! What is he doing? He is making garaetteok. How can I help you? We need garaetteok. We’ll make tteokbokki. How much do you need? One pack will do. How much is it? It’s 2,000 won. Okay, we’ll take it. Here it is. And try some of this food from our new menu. You two may share this. Thanks. You’re so kind! A traditional Korean market is a wonderful place. People are very busy. The sellers are making fresh food and selling many different things. They are very friendly. I will visit the market again with my parents. Now, we are heading for Jiwon’s house. Our tteokbokki will be great!'
  let translation= '지원이는 나의 새 한국 친구이다. 오늘, 그녀는 나를 위해 떡볶이를 만들어 줄 것이다. 하지만 그녀의 집에 가래떡이 없다. 우리는 전통 시장을 방문해서 가래떡을 좀 사야 한다. 빨리 방문하고 싶다! 이곳이 전통 시장이야. 우리는 싼 가격에 물건들을 살 수 있어. 사람들이 아주 바쁘구나. 저 여자분은 무엇을 요리하고 있니? 그녀는 전을 만드는 중이야. 그건 맛있어. 저 가게는 무엇을 팔고 있니? 사람들이 줄을 서 있네! 저기는 유명한 치킨 가게야. 오, 알겠어. 이곳은 아주 흥미롭구나! 좋아. 이제, 장 씨네 떡집을 방문하자! 그분은 무엇을 하고 계시니? 가래떡을 만들고 계셔. 무엇을 도와줄까? 저희는 가래떡이 필요해요. 떡볶이를 만들 거예요. 얼마나 필요하니? 한 묶음이면 될 것 같아요. 얼마죠? 이천 원이란다. 좋아요, 그걸 살게요. 여기 있어. 그리고 우리 새 메뉴인 이 음식을 좀 먹어 보렴. 너희 둘이 나눠 먹으면 될 거야. 감사합니다. 정말 친절하시군요! 전통 시장은 대단한 곳이다. 사람들은 매우 바쁘다. 파는 사람들은 신선한 음식을 만들고 있고 많은 다양한 것들을 팔고 있다. 그들은 매우 친절하다. 나는 그 시장을 부모님과 다시 방문할 것이다. 이제, 우리는 지원이네 집으로 향하고 있다. 우리의 떡볶이는 훌륭할 것이다!'



//   // let [paragraphRow] = await englishParagraphService.getParagraphs(10)
//   paragraph = paragraph.split(".")
//   paragraph = await splitParagraphBaseQuestionMark(paragraph)
//   paragraph = await splitParagraphBaseExclamationMark(paragraph)

//   questionTranslation = questionTranslation.split(" ")
  


//   let index =0
//   let questionParagraphs =[]
//   let addSharpParagraphs=[]

//   for (let i in paragraph){
    

//     if (questionParagraphs[index] == undefined)
//       questionParagraphs[index] = ""

//     paragraph[i][0]= paragraph[i][0].replace(/\r\n/gi," ")

    
//       // case "word." , "word?", "word!"
//     if ( paragraph[i][0][0]=='"'||paragraph[i][0][1]=='"' && paragraph[i][0][paragraph[i][0].length-1]!='"'){
//       if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
//         paragraph[i][0]+='."'
//         questionParagraphs[index] += paragraph[i]
//       }
//       else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
//         paragraph[i][0]+='!"'
//         questionParagraphs[index] += paragraph[i]
//       }
//       else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
//         paragraph[i][0]+='?"'
//         questionParagraphs[index] += paragraph[i]
//       }
//     }

//     else if(paragraph[i][0][0]=='"' &&paragraph[i][0][1]==" "){
//       paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
//       questionParagraphs[index] += paragraph[i]
//     }

    
//     //case (word.), (word!), (word?)
//     else if (paragraph[i][0][1]=='(' && paragraph[i][0][paragraph[i][0].length-1]!=')'){
//       if( paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!" ){
//         paragraph[i][0]+=".)"
//         questionParagraphs[index] += paragraph[i]
//       }
//       else if (paragraph[i][0][paragraph[i][0].length - 1] != "?") {
//         paragraph[i][0]+="!)"
//         questionParagraphs[index] += paragraph[i]
//       }
//       else if (paragraph[i][0][paragraph[i][0].length - 1] != "!") {
//         paragraph[i][0]+="?)"
//         questionParagraphs[index] += paragraph[i]
//       }
//     }
//     else if(paragraph[i][0][0]==')' && paragraph[i][0][1]==" "){
//       paragraph[i][0]=paragraph[i][0].substr(1,paragraph[i][0].length)
//       questionParagraphs[index] += paragraph[i]
//     }
//     // paragraph length>0 and !end , end == !'?', end == !'!'
//     else if (paragraph[i] && i != paragraph.length - 1 && paragraph[i][0][paragraph[i][0].length - 1] != "?" && paragraph[i][0][paragraph[i][0].length - 1] != "!") {
//       questionParagraphs[index] += paragraph[i] + "."
//     }
//     // case : ...
//     else if (!paragraph[i] && i != paragraph.length - 1) {
//       questionParagraphs[index] += "."
//     }
//     // case : end ==? OR !
//     else {
//       questionParagraphs[index] += paragraph[i]
//     }
//     if (questionParagraphs[index].length > 100) {
//       console.log(questionParagraphs[index], questionParagraphs[index].length)
//       questionParagraphs[index]=questionParagraphs[index].trim()
//       addSharpParagraphs+= questionParagraphs[index]+"#"
//       index ++
//     }
//   }
//   if(questionParagraphs[index].length<100){
//     questionParagraphs[index-1]+=questionParagraphs[index]
//     addSharpParagraphs=addSharpParagraphs.substr(0,addSharpParagraphs.lastIndexOf("#"))
//     addSharpParagraphs+= questionParagraphs[index]
//     questionParagraphs.pop()
//   }

//   // questionParagraphs.pop()

//   let questionTranslations = []
//   let addSharpTranslations=[]
//   index =0 

//   console.log(questionParagraphs)

//   for(paragraph of questionParagraphs){

//     let dotCount = paragraph.match(/\./g) != null ? paragraph.match(/\./g).length:0; 
//     let questionMarkCount = paragraph.match(/\?/g) != null ? paragraph.match(/\?/g).length:0; 
//     let exclamationMarkCount = paragraph.match(/\!/g) != null ? paragraph.match(/\!/g).length:0; 

//     tmp = _.cloneDeep(questionTranslation)
//     for( i in questionTranslation){
//       if (questionTranslations[index] == undefined){
//           questionTranslations[index] = ""
//       } 
//         //  console.log([paragraph])
//         //  console.log([questionTranslations[index]])

//         //  console.log("dotCount:",dotCount, "questionMarkCount:",questionMarkCount, "exclamationMarkCount:",exclamationMarkCount)
//          translationDotCount = questionTranslations[index].match(/\./g) != null ?  questionTranslations[index].match(/\./g).length:0; 
//          translationQuestionMarCount = questionTranslations[index].match(/\?/g) != null ?  questionTranslations[index].match(/\?/g).length:0
//          translationExclamationMarkCount = questionTranslations[index].match(/\!/g) != null ?  questionTranslations[index].match(/\!/g).length:0
//         //  console.log("translationDotCount:",translationDotCount,"translationQuestionMarCount:",translationQuestionMarCount, "exclamationMarkCount:",translationExclamationMarkCount) 
//          if(dotCount == translationDotCount && questionMarkCount == translationQuestionMarCount && exclamationMarkCount ==translationExclamationMarkCount){
//            console.log([questionTranslations[index]])

//            questionTranslations[index]=questionTranslations[index].trim()
//            addSharpTranslations += questionTranslations[index].trim()+"#"
//            index++
//            break
//          }
//           else{
//             // console.log(questionTranslation[i])
//             questionTranslations[index]+= questionTranslation[i]+" "
//           }
//           tmp.shift()
//       }
//       questionTranslation = _.cloneDeep(tmp)
//     }
//     console.log("index:",index)
//     console.log(questionTranslations[index])

//     addSharpTranslations += questionTranslations[index].trim()
  

  // console.log(addSharpParagraphs)
  // console.log(addSharpTranslations)
//   await englishParagraphService.registerParagraph("test",paragraph,translation,100,10)
   let [paragraphRow] = await englishParagraphService.getParagraph(17)
   let p = paragraphRow[0].english_paragraph
   let t = paragraphRow[0].english_paragraph_translation

   console.log(p.split("#"))
   console.log(t.split("#"))
   
//   let [row]=await englishParagraphService.getParagraph(10)
//   console.log(row[0].english_paragraph)
//   console.log(row[0].english_paragraph_translation)
//   addSharpParagraphs = addSharpParagraphs.split("#")
//   addSharpTranslations= addSharpTranslations.split("#")
//   console.log(addSharpParagraphs)
//   console.log(addSharpTranslations)
  
})()




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
