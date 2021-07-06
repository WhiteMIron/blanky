
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
                                   "opponentUserNickname" : "무지랭이"
*                                },
*                                {
*                                  "id": 432,
*                                  "matchDate": "2021-07-01T13:41:22.*000Z",
*                                  "winYN": true,
 *                                 "opponentUserId": 2220,
                                   "opponentUserNickname" : "무지랭이"

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
*                      answerIndex :
*                         type : integer
*                      answerLength :
*                         type : integer
*                      answerYN :
*                         type : bool
*                   example :
*                       code : 200
*                       data: [
*                                {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "winYN": true,
*                                   "answerHistory": [
*                                    {
*                                       "answerIndex": 33,
*                                       "answerLength": 5,
*                                       "answerYN": true
*                                    },
*                                    {
*                                       "answerIndex": 39,
*                                       "answerLength": 5,
*                                       "answerYN": true
*                                    },
*                                    {
*                                       "answerIndex": 54,
*                                       "answerLength": 7,
*                                       "answerYN": true
*                                    },
*                                    {
*                                       "answerIndex": 96,
*                                       "answerLength": 3,
*                                       "answerYN": true
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
*                                        "answerYN": true
*                                   },
*                                   {
*                                        "answerIndex": 44,
*                                        "answerLength": 3,
*                                        "answerYN": true
*                                   },
*                                   {
*                                        "answerIndex": 48,
*                                        "answerLength": 6,
*                                        "answerYN": true
*                                   },
*                                   {
*                                        "answerIndex": 65,
*                                        "answerLength": 6,
*                                        "answerYN": true
*                                   }
*                                  ]
*                                },
*                               {
*                                   "roundCount": 1,
*                                   "questionParagraph": "We're planning to join the K-pop Cover Dance Festival someday. We really want to visit Korea to see our favorite singers.",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "answerIndex": 33,
*                                       "answerLength": 5,
*                                       "answerYN": false
*                                    },
*                                    {
*                                       "answerIndex": 39,
*                                       "answerLength": 5,
*                                       "answerYN": false
*                                    },
*                                    {
*                                       "answerIndex": 54,
*                                       "answerLength": 7,
*                                       "answerYN": false
*                                    },
*                                    {
*                                       "answerIndex": 96,
*                                       "answerLength": 3,
*                                       "answerYN": false
*                                    }
*                                   ]
*                                  },
*                                  {
*                                   "roundCount": 2,
*                                   "questionParagraph": "I feel great because many Korea lovers from all around the world posted messages.",
*                                   "winYN": false,
*                                   "answerHistory": [
*                                   {
*                                       "answerIndex": 7,
*                                       "answerLength": 5,
*                                       "answerYN": false
*                                   },
*                                   {
*                                       "answerIndex": 44,
*                                       "answerLength": 3,
*                                       "answerYN": false
*                                   },
*                                   {
*                                       "answerIndex": 48,
*                                       "answerLength": 6,
*                                       "answerYN": false
*                                   },
*                                   {
*                                       "answerIndex": 65,
*                                       "answerLength": 6,
*                                       "answerYN": false
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
