const router = require("express").Router()
const request = require("request-promise")

router.get("/",async function(req,res){

    paragraph = "I am planning to invite them to Korea and pay for their plane tickets Also I will give some K-pop concert tickets to them I am planning to invite them to Korea and pay for their plane tickets Also I will give some K-pop concert tickets to them access acclaim account address"
    words = paragraph.split(" ")
    let jsonArray = new Array()

    for(word of words){
        const body= await test(word)
        const json = JSON.parse(body)
      
        const meansCollectors =json.searchResultMap.searchResultListMap.WORD.items[0].meansCollector
        let wordJson = new Object()
        if(meansCollectors.length >1){
            wordJson.word = word
            wordJson.partOfSpeech={}
        for(meansCollector of meansCollectors ){
            if(word.charAt(word.length-1) =="ed"){
                if(word,meansCollector.partOfSpeech=="동사"){
                    wordJson.partOfSpeech[meansCollector.partOfSpeech]= meansCollector.partOfSpeech2  
                }
            }
            else{
                wordJson.partOfSpeech[meansCollector.partOfSpeech]= meansCollector.partOfSpeech2  
            }
        }
            jsonArray.push(wordJson)
    }
    }
        let jObj = new Object()
        jObj.data = jsonArray
        res.send(jObj)
})


async function test(word){
    var options ={
        uri: "https://dict.naver.com/api3/enko/search",
        method:"GET",
        qs:{

            query :word
        
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    return await request(options)
}

module.exports=router