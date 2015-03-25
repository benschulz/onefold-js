'use strict';

define(['./stable-sort.test'], function () {
    var tests = arguments;

    describe('arrays', function () {
        Array.prototype.slice.call(tests).forEach(function (test) {
            test();
        });
    });
});
