'use strict';

define(['onefold-js'], function (js) {
    return function () {
        describe('identity', function () {
            it('The identity function should return the the first argument.', function () {
                var input = 'alice';

                var result = js.functions.identity(input);

                expect(result).to.equal(input);
            });

            // TODO sensible requirement?! don't really like it.. in fact.. I think it should throw if arguments.length < 1
            it('The identity function should return `undefined` when invoked without arguments.', function () {
                var result = js.functions.identity( );

                expect(result).to.equal(undefined);
            });

            it('The identity function should ignore any arguments beyond the first.', function () {
                js.functions.constant('bob', 'further', 'arguments');
            });
        });
    };
});
