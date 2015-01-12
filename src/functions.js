'use strict';

define([], function () {
    var constant = x => () => x;

    return {
        true: constant(true),
        false: constant(false),
        nop: constant(undefined),
        null: constant(null),
        zero: constant(0),

        constant: constant,
        identity: x => x
    };
});