'use strict';

define(['onefold-js'], function (js) {
    return function () {
        describe('constant', function () {
            it('The returned function should return the input value.', function () {
                var input = 42;

                var result = js.functions.constant(input);

                expect(result()).to.equal(input);
            });

            it('The returned function should ignore any arguments.', function () {
                var result = js.functions.constant();

                result('some', 'arguments');
            });
        });
    };
});
