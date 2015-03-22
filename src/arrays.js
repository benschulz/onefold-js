'use strict';

define(['./objects'], function (/**@type {onefold.js.objects}*/objects) {
    return {
        contains: contains,
        distinct: distinct,
        flatMap: flatMap,
        single: single,
        singleOrNull: singleOrNull,
        stableSort: stableSortInPlace
    };

    function contains(array, value) {
        return array.indexOf(value) >= 0;
    }

    function distinct(array) {
        return array.length > 50
            ? distinctForLargeArrays(array)
            : distinctForSmallArrays(array);
    }

    function distinctForSmallArrays(array) {
        return array.filter(function (e, i, a) {
            return a.lastIndexOf(e) === i;
        });
    }

    function distinctForLargeArrays(source) {
        var length = source.length,
            stringLookup = {},
            value;

        for (var i = 0; i < length; ++i) {
            value = source[i];

            if (typeof  value === 'string') {
                if (objects.hasOwn(stringLookup, value))
                    break;
                else
                    stringLookup[value] = true;
            } else if (source.lastIndexOf(value) !== i) {
                break;
            }
        }

        if (i >= length)
            return source;

        var destination = source.slice(0, i);

        for (; i < length; ++i) {
            value = source[i];

            if (typeof  value === 'string') {
                if (!objects.hasOwn(stringLookup, value)) {
                    stringLookup[value] = true;
                    destination.push(value);
                }
            } else if (source.lastIndexOf(value) === i) {
                destination.push(value);
            }
        }

        return destination;
    }

    function flatMap(array, mapper) {
        return Array.prototype.concat.apply([], array.map(mapper));
    }

    function single(array, predicate) {
        var index = trySingleIndex(array, predicate);
        if (index < 0)
            throw new Error('None of the elements matches the predicate.');
        return array[index];
    }

    function singleOrNull(array, predicate) {
        var index = trySingleIndex(array, predicate);
        return index >= 0 ? array[index] : null;
    }

    function trySingleIndex(array, predicate) {
        var length = array.length,
            matchIndex = -1;

        for (var i = 0; i < length; ++i) {
            var element = array[i];

            if (predicate(element)) {
                if (matchIndex >= 0)
                    throw new Error('Multiple elements match the predicate.');
                matchIndex = i;
            }
        }

        return matchIndex;
    }

    function stableSortInPlace(array, comparator) {
        return stableSort(array, comparator || naturalComparator, true);
    }

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
});