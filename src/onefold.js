'use strict';

define(['./arrays', './objects', './strings'], function (arrays, objects, strings) {
    return {
        'arrays': {
            'contains': arrays.contains,
            'distinct': arrays.distinct,
            'flatMap': arrays.flatMap,
            'single': arrays.single,
            'singleOrNull': arrays.singleOrNull,
            'stableSort': arrays.stableSort
        },
        'objects': {
            'areEqual': objects.areEqual,
            'extend': objects.extend,
            'forEachProperty': objects.forEachProperty,
            'hasOwn': objects.hasOwn,
            'mapProperties': objects.mapProperties
        },
        'strings': {
            'convertCamelToHyphenCase': strings.convertCamelToHyphenCase,
            'convertHyphenToCamelCase': strings.convertHyphenToCamelCase
        }
    };
});
