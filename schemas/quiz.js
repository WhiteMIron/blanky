
/**
*  @swagger
*
*  paths:
*   /quiz/difficulty/{difficulty}  :
*      get:
*        summary: get Chapter info by difficulty
*        parameters:
*          - in: path
*            name: difficulty
*        tags: [quiz]
*
*        responses:
*          "200":
*             description: 난이도별 챕터 조회 성공
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
*                                  "id": 1,
*                                  "chapterName": "Small Creative Ideas, Big Changes",
*                                  "chapterImg": https://blanky.s3.ap-northeast-2.amazonaws.com/userProFile/1625640465324_1chapter.png,
*                                  "playCount": 20,
*                                },
*                                {
*                                  "id": 2,
*                                  "chapterName": "You can Be Confident",
*                                  "chapterImg": https://blanky.s3.ap-northeast-2.amazonaws.com/userProFile/1625640465324_2chapter.png,
*                                  "playCount": 25,
*
*                                }
*                               ]
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
*                                  "chapterName": "I feel great because many Korea lovers from all around the world posted messages. I believe that they love Korea a lot. I will read the top three to show my special thanks.",
*                                  "chapterImg": 오늘은 전 세계의 한국을 사랑하는 많은 분들이 메시지를 올려 주셔서 정말 기분이 좋네요. 저는 그분들이 한국을 정말 사랑한다고 믿어요. 제가 특별히 감사함을 표현하기 위해 가장 잘 쓴 세 개의 메시지를 읽어 드릴게요. 
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
*/
