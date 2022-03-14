
/**
*  @swagger
*
*  paths:
*   /quiz/chapterList  :
*      get:
*        summary: get chapterList
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 전체 챕터 리스트 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : object
*                      allChapterSummaryList :
*                         type : array
*                      easyChapterList  :
*                         type : array
*                      normalChapterList :
*                         type : array
*                      hardChapterList :
*                         type : string
*                      id :
*                         type : integer
*                      name :
*                         type : string
*                      count :
*                         type : integer
*                      difficulty :
*                         type : integer
*                      img :
*                         type : string
*                      addedDate :
*                         type : string
*                   example :
*                       code : 200
*                       data :
*                             {
*                               "allChapterSummaryList":[
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      }
*                               ],
*                               "easyChapterList":[
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      }
*                                ],
*                               "normalChapterList":[
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      }
*                                 ],
*                               "hardChapterList":[
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      },
*                                     {
*                                       "id": 43,
*                                       "name": "Let’s Make Ricotta Cheese",
*                                       "count": 0,
*                                       "difficulty": 1,
*                                       "img": null,
*                                       "addedDate": "2021-07-15"
*                                      }
*                                  ]
*                               }
*
*
*          "400":
*             description: 잘못된 요청
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 400
*                       message : 잘못된 요청
*
*   /quiz/chapter/{chapterId}  :
*      get:
*        summary: get Chapter detail info
*        parameters:
*          - in: path
*            name: chapterId
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 챕터 상세 정보 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : object
*                      paragraph :
*                         type : string
*                      translation :
*                         type : string
*                   example :
*                       code : 200
*                       data :
*                                {
*                                  "paragraph": "I feel great because many Korea lovers from all around the world posted messages. I believe that they love Korea a lot. I will read the top three to show my special thanks.",
*                                  "translation": 오늘은 전 세계의 한국을 사랑하는 많은 분들이 메시지를 올려 주셔서 정말 기분이 좋네요. 저는 그분들이 한국을 정말 사랑한다고 믿어요. 제가 특별히 감사함을 표현하기 위해 가장 잘 쓴 세 개의 메시지를 읽어 드릴게요.
*                                }
*
*
*
*          "400":
*             description: 잘못된 요청
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 400
*                       message : 잘못된 요청
*
*   /quiz/play/chapter/{chapterId}  :
*      get:
*        summary: get solo quizInfo
*        parameters:
*          - in: path
*            name: chapterId
*          - in: query
*            name: blankDifficulty
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 솔로모드 퀴즈 정보 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : object
*                      questionParagraph :
*                         type : string
*                      translation  :
*                         type : string
*                      blankWords :
*                         type : array
*                      blankWordsIndexes :
*                         type : array
*                      startIndex :
*                         type : integer
*                      endIndex :
*                         type : integer
*                   example :
*                       code : 200
*                       data :
*                             [
*                                {
*                                 "questionParagraph": "With the other hand, slowly stir. Then, wait until the mixture becomes thick. Third, remove the water from it.",
*                                  "translation": "이제 이 단계들을 따라와 봐! 첫 번째, 우유를 냄비에 따르고 따뜻하게 데워. 우유가 끓기 시작하면 불에서 우유를 내려.",
*                                  "blankWords": [
*                                      "hand",
*                                      "slowly",
*                                      "stir",
*                                      "wait",
*                                   ],
*                                  "blankWordsIndexes": [
*                                       {
*                                        "startIndex": 15,
*                                        "endIndex": 19
*                                       },
*                                       {
*                                        "startIndex": 21,
*                                        "endIndex": 27
*                                       },
*                                       {
*                                         "startIndex": 28,
*                                         "endIndex": 32
*                                       },
*                                       {
*                                         "startIndex": 40,
*                                         "endIndex": 44
*                                       }
*                                     ]
*                                   }
*                                 ]
*
*
*          "400":
*             description: 잘못된 요청
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 400
*                       message : 잘못된 요청
*
*   /quiz/chapterRanks  :
*      get:
*        summary: get chapterRanks
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 인기 챕터 랭킹 정보 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : array
*                      id :
*                         type : integer
*                      name  :
*                         type : string
*                      count :
*                         type : integer
*                      img :
*                         type : string
*                      difficulty :
*                         type : integer
*                   example :
*                       code : 200
*                       data :
*                             [
*                               {
*                                 "id": 6,
*                                 "name": "Markets Around Us",
*                                 "count": 25,
*                                 "img": "https://blanky.s3.ap-northeast-2.amazonaws.com/textbookFile/middle1/geumseong/TraditionalMarket.png"
*                                },     {
*                                 "id": 5,
*                                 "name": "We Are Good Friends",
*                                 "count": 25,
*                                 "img": "https://blanky.s3.ap-northeast-2.amazonaws.com/textbookFile/middle1/geumseong/friends.png"
*                                 }
*                              ]
*
*
*          "400":
*             description: 잘못된 요청
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 400
*                       message : 잘못된 요청
*
*   /quiz/dictionary  :
*      get:
*        summary: get dictionary result info
*        parameters:
*          - in: query
*            name: word
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 영어사전 정보 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : object
*                      word:
*                         type : string
*                      dictionaryResult:
*                         type : array
*                      partOfSpeech:
*                         type : string
*                      exampleOri:
*                         type : string
*                      exampleTrans:
*                         type : string
*                   example :
*                       code : 200
*                       data :
*                             [
*                                   "word": "hello",
*                                   {
*                                     "partOfSpeech": "감탄사, 명사: 얼씨구(상대방의 말이 바보 같거나, 상대방이 주의를 기울이지 않고 있다고 여길 때) (→golden hello)",
*                                     "exampleOri": "Hello? You didn’t really mean that, did you?",
*                                     "exampleTrans": "얼씨구? 너 그 말 진심으로 한 건 아니겠지, 응?"
*                                   },
*                                   {
*                                     "partOfSpeech": "감탄사, 명사: 얼씨구(상대방의 말이 바보 같거나, 상대방이 주의를 기울이지 않고 있다고 여길 때) (→golden hello)",
*                                     "exampleOri": "Hello? You didn’t really mean that, did you?",
*                                     "exampleTrans": "얼씨구? 너 그 말 진심으로 한 건 아니겠지, 응?"
*                                   },
*                                   {
*                                     "partOfSpeech": "감탄사, 명사: 얼씨구(상대방의 말이 바보 같거나, 상대방이 주의를 기울이지 않고 있다고 여길 때) (→golden hello)",
*                                     "exampleOri": "Hello? You didn’t really mean that, did you?",
*                                     "exampleTrans": "얼씨구? 너 그 말 진심으로 한 건 아니겠지, 응?"
*                                   }
*                              ]
*
*
*          "400":
*             description: 잘못된 요청
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 400
*                       message : 잘못된 요청
*
*/
