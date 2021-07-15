
/**
*  @swagger
*
*  paths:
*   /match:
*      get:
*        summary: get mathHistory
*        parameters:
*          - in: header
*            name: auth
*        tags: [match]
*
*        responses:
*          "200":
*             description: 대전기록 조회 성공
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
*                         type : string
*                      matchDate :
*                         type : string
*                      winYN :
*                         type : bool
*                      opponentUserId:
*                         type : integer
*                      opponentUserNickname:
*                         type : string
*                   example :
*                       code : 200
*                       data :
*                               [
*                                {
*                                  "id": 431,
*                                  "matchDate": "2021-07-01T13:31:22.*000Z",
*                                  "winYN": true,
*                                  "opponentUserId": 2220,
                                   "opponentUserNickname" : "트팟"
*                                },
*                                {
*                                  "id": 432,
*                                  "matchDate": "2021-07-01T13:41:22.*000Z",
*                                  "winYN": true,
 *                                 "opponentUserId": 2220,
                                   "opponentUserNickname" : "팟트"

*                                }
*                               ]
*
*
*          "410":
*             description: 추가정보 미등록
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
*                       code : 410
*                       message : 추가정보 미등록
*          "419":
*             description: 토큰 만료
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
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*          "401":
*             description: 유효하지 않은 토큰입니다.
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
*                       code : 401
*                       message : 유효하지 않은 토큰입니다.
*   /match/round:
*      get:
*        summary : get roundHistory
*        parameters :
*          - in : header
*            name: auth
*          - in : query
*            name : matchHistoryId
*          - in: query
*            name : opponentUserId
*        tags: [match]
*
*        responses:
*          "200":
*             description: 라운드 기록 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : array
*                      roundCount :
*                         type : integer
*                      questionParagraph :
*                         type : string
*                      winYN :
*                         type : bool
*                      answerHistory :
*                         type : array
*                      rightWord :
*                         type : string
*                      startIndex :
*                         type : integer
*                      endIndex :
*                         type : integer
*                      isAnswer :
*                         type : bool
*                   example :
*                       code : 200
*                       data: [
*                                {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": true,
*                                   "answerHistory": [
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    }
*                                   ]
*                                 },
*                               {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": 1,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   }
*                                  ]
*                                },
*                               {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    }
*                                   ]
*                                  },
*                                  {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   }
*                                  ]
*                                 }
*                                ]
*
*
*          "410":
*             description: 추가정보 미등록
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
*                       code : 410
*                       message : 추가정보 미등록
*          "419":
*             description: 토큰 만료
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
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*          "401":
*             description: 유효하지 않은 토큰입니다.
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
*                       code : 401
*                       message : 유효하지 않은 토큰입니다.
*
*   /match/solo/history/round/{matchHistoryId}:
*      get:
*        summary : get solo roundHistory
*        parameters :
*          - in : header
*            name: auth
*          - in : path
*            name : matchHistoryId
*        tags: [match]
*
*        responses:
*          "200":
*             description: 라운드 기록 조회 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      data :
*                         type : array
*                      roundCount :
*                         type : integer
*                      questionParagraph :
*                         type : string
*                      questionTranslation :
*                         type : string
*                      winYN :
*                         type : bool
*                      answerHistory :
*                         type : array
*                      rightWord :
*                         type : string
*                      startIndex :
*                         type : integer
*                      endIndex :
*                         type : integer
*                      isAnswer :
*                         type : bool
*                   example :
*                       code : 200
*                       data: [
*                                {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": true,
*                                   "answerHistory": [
*                                    {
                                        "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
                                        "rightWord" : "test",
*                                       "startIndex": 39,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    }
*                                   ]
*                                 },
*                               {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "winYN": 1,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   }
*                                  ]
*                                },
*                               {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    },
*                                    {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                    }
*                                   ]
*                                  },
*                                  {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "questionTranslation": "테스트 해석문장",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   },
*                                   {
*                                       "rightWord" : "test",
*                                       "startIndex": 33,
*                                       "endIndex": 5,
*                                       "isAnswer": true
*                                   }
*                                  ]
*                                 }
*                                ]
*
*
*          "410":
*             description: 추가정보 미등록
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
*                       code : 410
*                       message : 추가정보 미등록
*          "419":
*             description: 토큰 만료
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
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*          "401":
*             description: 유효하지 않은 토큰입니다.
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
*                       code : 401
*                       message : 유효하지 않은 토큰입니다.
*   /match/solo/history:
*      get:
*        summary: get solo mathHistory
*        parameters:
*          - in: header
*            name: auth
*        tags: [match]
*
*        responses:
*          "200":
*             description: 솔로 대전기록 조회 성공
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
*                         type : string
*                      matchDate :
*                         type : string
*                      winYN :
*                         type : bool
*                      opponentUserId:
*                         type : integer
*                      opponentUserNickname:
*                         type : string
*                   example :
*                       code : 200
*                       data :
*                               [
*                                {
*                                  "id": 431,
*                                  "matchDate":  "2021-07-15 11:05:43",
*                                  "winYN": true,
*                                },
*                                {
*                                  "id": 432,
*                                  "matchDate":  "2021-07-15 11:05:43",
*                                  "winYN": true,
*                                }
*                               ]
*
*
*          "410":
*             description: 추가정보 미등록
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
*                       code : 410
*                       message : 추가정보 미등록
*          "419":
*             description: 토큰 만료
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
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*          "401":
*             description: 유효하지 않은 토큰입니다.
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
*                       code : 401
*                       message : 유효하지 않은 토큰입니다.
*      post:
*        summary: record solo mathHistory
*        parameters:
*          - in: header
*            name: auth
*        tags: [match]
*
*        requestBody:
*          description: Optional description in *Markdown*
*          required: true
*          content:
*            application/json:
*              schema:
*                 type: object
*                 properties :
*                    history :
*                     type : object
*                    matchHistory :
*                     type : object
*                    isMatchWin :
*                     type : bool
*                    matchDate :
*                     type : string
*                    roundHistory :
*                     type : object
*                    count :
*                     type : integer
*                    questionParagraph:
*                     type : string
*                    questionTranslation:
*                     type : string
*                    isWin :
*                     type : bool
*                    answerHistory :
*                     type : object
*                    rightWord :
*                     type : string
*                    startIndex :
*                     type : integer
*                    endIndex :
*                     type : integer
*                    isAnswer :
*                     type : bool
*        responses:
*          "200":
*             description: 솔로 대전기록 저장 성공
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
*                         type : string
*                      matchDate :
*                         type : string
*                      winYN :
*                         type : bool
*                   example :
*                       code : 200
*
*
*          "410":
*             description: 추가정보 미등록
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
*                       code : 410
*                       message : 추가정보 미등록
*          "419":
*             description: 토큰 만료
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
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*          "401":
*             description: 유효하지 않은 토큰입니다.
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
*                       code : 401
*                       message : 유효하지 않은 토큰입니다.
*/
