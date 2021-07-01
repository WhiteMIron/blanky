
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
*                      message :
*                         type : string
*                      data :
*                         type : array
*                      id :
*                         type : string
*                      matchDate :
*                         type : string
*                      winYN :
*                         type : integer
*                      opponetUserId:
*                         type : integer
*                   example :
*                       code : 200
*                       message : 대전기록 조회 성공
*                       data : 
*                               [ 
*                                {
*                                  "id": 431,
*                                  "matchDate": "2021-07-01T13:31:22.*000Z",
*                                  "winYN": 1,
*                                  "opponetUserId": 2220
*                                },
*                                {
*                                  "id": 431,
*                                  "matchDate": "2021-07-01T13:31:22.*000Z",
*                                  "winYN": 1,
*                                 "opponetUserId": 2220
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
*          - in : query
*            name : matchDate
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
*                      message :
*                         type : string
*                      data :
*                         type : array
*                      id :
*                         type : string
*                      matchDate :
*                         type : string
*                      winYN :
*                         type : integer
*                      opponetUserId:
*                         type : integer
*                   example :
*                       code : 200
*                       message : 라운드 기록 조회 성공
*                       data: [
*                                {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "winYN": 1,
*                                   "answerHistory": [
*                                    {
*                                       "answerIndex": 33,
*                                       "answerLength": 5,
*                                       "answerYN": 1
*                                    },
*                                    {
*                                       "answerIndex": 39,
*                                       "answerLength": 5,
*                                       "answerYN": 1
*                                    },
*                                    {
*                                       "answerIndex": 54,
*                                       "answerLength": 7,
*                                       "answerYN": 1
*                                    },
*                                    {
*                                       "answerIndex": 96,
*                                       "answerLength": 3,
*                                       "answerYN": 1
*                                    }
*                                   ]
*                                 },
*                               {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "winYN": 1,
*                                   "answerHistory": [
*                                   {
*                                        "answerIndex": 7,
*                                        "answerLength": 5,
*                                        "answerYN": 1
*                                   },
*                                   {
*                                        "answerIndex": 44,
*                                        "answerLength": 3,
*                                        "answerYN": 1
*                                   },
*                                   {
*                                        "answerIndex": 48,
*                                        "answerLength": 6,
*                                        "answerYN": 1
*                                   },
*                                   {
*                                        "answerIndex": 65,
*                                        "answerLength": 6,
*                                        "answerYN": 1
*                                   }
*                                  ]
*                                },
*                               {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "winYN": 0,
*                                   "answerHistory": [
*                                   {
*                                       "answerIndex": 33,
*                                       "answerLength": 5,
*                                       "answerYN": 0
*                                    },
*                                    {
*                                       "answerIndex": 39,
*                                       "answerLength": 5,
*                                       "answerYN": 0
*                                    },
*                                    {
*                                       "answerIndex": 54,
*                                       "answerLength": 7,
*                                       "answerYN": 0
*                                    },
*                                    {
*                                       "answerIndex": 96,
*                                       "answerLength": 3,
*                                       "answerYN": 0
*                                    }
*                                   ]
*                                  },
*                                  {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "winYN": 0,
*                                   "answerHistory": [
*                                   {
*                                       "answerIndex": 7,
*                                       "answerLength": 5,
*                                       "answerYN": 0
*                                   },
*                                   {
*                                       "answerIndex": 44,
*                                       "answerLength": 3,
*                                       "answerYN": 0
*                                   },
*                                   {
*                                       "answerIndex": 48,
*                                       "answerLength": 6,
*                                       "answerYN": 0
*                                   },
*                                   {
*                                       "answerIndex": 65,
*                                       "answerLength": 6,
*                                       "answerYN": 0
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
*/
