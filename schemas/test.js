
/**
*  @swagger
*
*  paths:
*   /test:
*     get:
*       summary: token test
*       tags: [test]
*       parameters:
*          - in: header
*            name: auth
*       responses:
*         "200":
*           description: 토큰 유효성 검증 성공
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      message :
*                         type : string
*                   example :
*                       code : 200
*                       message : test success
*         "410":
*           description: 추가정보 등록 필요
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 410
*                       message : 추가정보 미등록
*         "401":
*           description: 유효하지 않은 토큰입니다.
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 410
*                       message : 유효하지 않은 토큰입니다.
*         "419":
*           description: 토큰이 만료되었습니다.
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                   example :
*                       code : 419
*                       message : 토큰이 만료되었습니다.
*
*
*
*
*/
