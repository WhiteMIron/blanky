'use strict';

let constants = {
    wait  : 1,
    ready : 2,
    play  : 3,
    waiting :1,
    matched :2
};

module.exports =
        Object.freeze(constants); // freeze prevents changes by users
