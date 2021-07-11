'use strict';

let constants = {
    wait  : 1,
    ready : 2,
    play  : 3,
    waiting :1,
    matched :2,
    dual : true,
    solo : false,
    win : true,
    lose : false,
    right : true,
    wrong : false,
    upperWinnerScore : 7,
    middleWinnerScore: 5,
    lowerWinnerScore : 3,
    upperLoserScore : -1,
    middleWinnerScore : -1,
    lowerWinnerScore : -1,
    notExists : -1
};

module.exports =
        Object.freeze(constants); // freeze prevents changes by users
