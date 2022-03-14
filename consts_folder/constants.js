'use strict';

let constants = {
    easyMaxBlank: 4,
    normalMaxBlank :6,
    hardMaxBlank :8,
    dualRoundCount :4,
    soloRoundCount :3,
    easyMode :1,
    normalMode :2,
    hardMode :3,
    easyMinLength : 1,
    normalMinLength : 2,
    hardMinLength : 3,
    hardWinnerScore : 5,
    normalWinnerScore: 4,
    easyWinnerScore : 3,
    hardLoserScore : -1,
    normalLoserScore : -1,
    easyLoserScore : -1,
};

module.exports =
        Object.freeze(constants); // freeze prevents changes by users
