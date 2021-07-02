
/**
*  @swagger
*
*  paths:
*   /auth/kakao/login:
*     get:
*       summary: kakao login
*       tags: [auth]
*       parameters:
*          - in: header
*            name: auth
*       responses:
*         "200":
*           description: 로그인 성공
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                      token :
*                         type : string
*                   example :
*                       code : 200
*                       message : 로그인 성공
*                       token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYxLCJ2ZXJpZnkiOjAsImlhdCI6MTYyMzIwMDE1MCwiZXhwIjoxN
*
*         "410":
*           description: 추가정보 미등록
*           content:
*             application/json:
*                schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                      token :
*                         type : string
*                   example :
*                       code : 200
*                       message : 추가정보 미등록
*                       token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYxLCJ2ZXJpZnkiOjAsImlhdCI6MTYyMzIwMDE1MCwiZXhwIjoxN
*
*
*
*   /auth/signup:
*      post:
*        summary: sign up
*        parameters:
*          - in: header
*            name: auth
*        tags: [auth]
*        requestBody:
*          description: Optional description in *Markdown*
*          required: true
*          content:
*            application/json:
*              schema:
*                 type: object
*                 properties :
*                    school :
*                     type : string
*
*        responses:
*          "201":
*             description: 회원가입 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*                      token :
*                         type : string
*                   example :
*                       code : 201
*                       message : access token 발급
*                       token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYxLCJ2ZXJpZnkiOjAsImlhdCI6MTYyMzIwMDE1MCwiZXhwIjoxN
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
*          "402":
*             description: 잘못된 값입니다.
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
*                       code : 402
*                       message : 잘못된 값입니다.
*
*/
