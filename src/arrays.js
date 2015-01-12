'use strict';

define([], function () {
    function naturalComparator(a, b) {
        return a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function'
            ? (a.valueOf() <= b.valueOf() ? a.valueOf() < b.valueOf() ? -1 : 0 : 1)
            : (a <= b ? a < b ? -1 : 0 : 1);
    }

    function stableSort(source, comparator, sortSource) {
        var isChrome = !!window['chrome'];
        var nativeSortIsStable = !isChrome;

        return nativeSortIsStable ? stableSortNative(source, comparator, sortSource) : stableSortCustom(source, comparator, sortSource);
    }

    function stableSortNative(source, comparator, sortSource) {
        var destination = sortSource === true ? source : source.slice();
        destination.sort(comparator);
        return destination;
    }

    function stableSortCustom(source, comparator, sortSource) {
        var length = source.length;
        var indexes = new Array(length);
        var destination = new Array(length);
        var i;

        // TODO performance benchark: would it be better copy source via .slice()?
        //      i would hope this does pretty much the same as .slice() but we give
        //      out-of-order execution the chance to absorb more cache misses until
        //      the prefetcher kicks in
        for (i = 0; i < length; ++i) {
            indexes[i] = i;
            destination[i] = source[i];
        }

        if (sortSource === true) {
            var tmp = source;
            source = destination;
            destination = tmp;
        }

        indexes.sort(function (a, b) {
            var byOrdering = comparator(source[a], source[b]);
            return byOrdering || a - b;
        });

        for (i = 0; i < length; ++i)
            destination[i] = source[indexes[i]];

        return destination;
    }

    return {
        contains: (array, value) => array.indexOf(value) >= 0,
        flatMap: (array, mapping)  => Array.prototype.concat.apply([], array.map(mapping)),
        stableSort: (array, comparator) => stableSort(array, comparator || naturalComparator, true)
    };
});