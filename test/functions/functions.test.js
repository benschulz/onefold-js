'use strict';

define(['./constant.test', './identity.test'], function () {
    var tests = arguments;

    describe('functions', function () {
        Array.prototype.slice.call(tests).forEach(function (test) {
            test();
        });
    });
});
