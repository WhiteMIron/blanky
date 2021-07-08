
/**
*  @swagger
*
*  paths:
*   /user:
*      get:
*        summary: get userInfo
*        parameters:
*          - in: header
*            name: auth
*        tags: [user]
*
*        responses:
*          "200":
*             description: 유저정보 조회 성공
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
*                      nickname :
*                         type : string
*                      email :
*                         type : string
*                      dual_score:
*                         type : integer
*                      solo_score:
*                         type : integer
*                      profile_img:
*                         type : string
*                      description :
*                         type : string
*                      rank   :
*                         type : integer
*                      totalRank:
*                         type : integer
*
*                   example :
*                       code : 200
*                       message : 유저정보 조회 성공
*                       data : { "id": 38,
*                                "nickname": "zizo",
*                                "email" : "zizo@gmail.com",
*                                "dualScore": 100,
*                                "soloScore": 100,
*                                "profileImg":"https://google.com/d02lmcxizdksjdiasdadkci.jpeg",
*                                "description" : "올것이 왔군..",
*                                "rank": 1,
*                                "totalRank": 22500
*                                }
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
*
*
*      put:
*        summary: change userInfo
*        parameters:
*          - in: header
*            name: auth
*        tags: [user]
*
*        requestBody:
*          description: Optional description in *Markdown*
*          required: true
*          content:
*            application/json:
*              schema:
*                 type: object
*                 properties :
*                    nickname :
*                     type : string
*                    email :
*                     type : string
*                    school :
*                     type : string
*                    description :
*                     type : string

*
*        responses:
*          "201":
*             description: 유저정보 변경 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*
*                   example :
*                       code : 201
*                       message : 유저정보 변경 성공
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
*   /user/profile:
*      put:
*        summary: change userProfile
*        parameters:
*          - in: header
*            name: auth
*        tags: [user]
*
*        requestBody:
*          description: Optional description in *Markdown*
*          required: true
*          content:
*            multipart/form-data:
*              schema:
*                 type: object
*                 properties :
*                    imgFile :
*                     type : string
*                     format: binary
*
*
*        responses:
*          "201":
*             description: 유저프로필 변경 성공
*             content:
*               application/json:
*                 schema:
*                   type: object
*                   properties :
*                      code :
*                         type : integer
*                      message :
*                         type : string
*
*                   example :
*                       code : 201
*                       message : 유저프로필 변경 성공
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
*   /user/statistics:
*      get:
*        summary: get score statistics
*        parameters:
*          - in: header
*            name: auth
*        tags: [user]
*
*        responses:
*          "200":
*             description: 점수 통계 조회 성공
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
*                         type : object
*                      dayStat :
*                         type : array
*                      weekStat :
*                         type : array
*                      monthStat :
*                         type : array
*                      date :
*                         type : string
*                      score :
*                         type : string
*
*                   example :
*                       code : 200
*                       data : {
*                                "dayStat" :[
*                                    { "date" : "2021-07-01",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : "2021-07-02",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : "2021-07-02",
*                                      "socre" : "0"
*                                    },
*                                ],
*
*                                "weekStat" :[
*                                    { "date" : "2021-07-01",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : "2021-07-02",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : "2021-07-02",
*                                      "socre" : "0"
*                                    }
*                                    ],
*
*                                "monthStat" :[
*                                    { "date" : "2021-07-01",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : 2021-07-02",
*                                      "socre" : "0"
*                                    },
*                                    { "date" : "2021-07-02",
*                                      "socre" : "0"
*                                    }
*                                 ]
*                             }
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
