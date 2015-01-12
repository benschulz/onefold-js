'use strict';

define(['./constant', './identity'], function () {
    var tests = arguments;

    describe('functions', function () {
        Array.prototype.slice.call(tests).forEach(function (test) {
            test();
        });
    });
});
