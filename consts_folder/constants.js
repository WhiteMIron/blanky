'use strict';

let constants = {
    easyMaxBlank: 4,
    normalMaxBlank :6,
    hardMaxBlank :8,
    dualRoundCount :4,
    soloRoundCount :3
};

module.exports =
        Object.freeze(constants); // freeze prevents changes by users
