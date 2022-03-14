'use strict';

let constants = {
    wait  : 1,
    ready : 2,
    play  : 3,
    end : 4,
    exit  : -1,
    waiting :1,
    matched :2,
    expiredSearch :4,
    dual : true,
    solo : false,
    win : true,
    lose : false,
    right : true,
    wrong : false,
    notExists : -1,
    addDiffScore : 50,
    addSearchMaxScore : 100,
    currentSearchScoreDiff : 0
};

module.exports =
        Object.freeze(constants); // freeze prevents changes by users
