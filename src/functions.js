'use strict';

define([], function () {
    var constant = x => () => x;

    return {
        // TODO with arrow functions these can go away
        true: constant(true),
        false: constant(false),
        nop: constant(undefined),
        null: constant(null),
        zero: constant(0),

        constant: constant,
        identity: x => x
    };
});