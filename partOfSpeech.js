const request = require('request-promise');

(async()=>{

    // paragraph = "We need to have the car serviced"
    paragraph = "I am planning to invite them to Korea and pay for their plane tickets Also I will give some K-pop concert tickets to them"
    words = paragraph.split(" ")
    console.log(paragraph)

    for(word of words){
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
        
        const body= await request(options)
        const json = JSON.parse(body)
        const meansCollectors =json.searchResultMap.searchResultListMap.WORD.items[0].meansCollector
        for(meansCollector of meansCollectors )
            if(word.charAt(word.length-1) =="ed"){
                if(word,meansCollector.partOfSpeech=="동사")
                  console.log(word,meansCollector.partOfSpeech,":",meansCollector.partOfSpeech2)
            }
            else
              console.log(word,meansCollector.partOfSpeech,":",meansCollector.partOfSpeech2)
      
        }
})()