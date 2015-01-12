'use strict';

define(['onefold-js'], function (js) {
    return function () {
        describe('stableSort', function () {
            it('should return the given array.', function () {
                var array = [];

                var result = js.arrays.stableSort(array);

                expect(result).to.equal(array);
            });

            it('If a comparator is specified, should sort elements using it.', function () {
                var array = [-5, 1, -2, 4, 3];

                js.arrays.stableSort(array, function (a, b) { return Math.abs(a) - Math.abs(b); });

                expect(array).to.deep.equal([1, -2, 3, 4, -5]);
            });

            describe('should be stable', function () {
                function parameterization(description, size) {
                    var first = [0, 1], second = [0, 2], third = [0, 3];
                    var array = new Array(size + 1);
                    for (var i = 0; i < size + 1; ++i) array[i] = [size / 2 - i];
                    array[size / 2] = second;
                    array.unshift(first);
                    array.push(third);

                    js.arrays.stableSort(array, function (a, b) { return a[0] - b[0]; });

                    expect(array[size / 2]).to.equal(first);
                    expect(array[size / 2 + 1]).to.equal(second);
                    expect(array[size / 2 + 2]).to.equal(third);
                }

                // most browsers will probably have one implementation for arrays of length ten or so and smaller
                // and one for bigger arrays. but testing different sizes beyond that should not hurt.
                parameterization('for tiny arrays', 4);
                parameterization('for small arrays', 100);
                parameterization('for medium sized arrays', 1000);
                parameterization('for large arrays', 10000);
                parameterization('for huge arrays', 100000);
            });

            it('should be stable for reasonably large arrays.', function () {
            });

            describe('If the comparator is not specified', function () {
                it('should sort strings lexicographically.', function () {
                    var array = ['c', 'b', 'AA', 'BB', '11', '9'];

                    js.arrays.stableSort(array);

                    expect(array).to.deep.equal(['11', '9', 'AA', 'BB', 'b', 'c']);
                });

                it('should sort numbers based on value.', function () {
                    var array = [5, 1, 9, -7, 100, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, -0, 0];

                    js.arrays.stableSort(array);

                    expect(array).to.deep.equal([Number.NEGATIVE_INFINITY, -7, -0, 0, 1, 5, 9, 100, Number.POSITIVE_INFINITY]);
                });
            });
        });
    };
});
