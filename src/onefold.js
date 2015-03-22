'use strict';

define(['./arrays', './functions', './objects', './strings'], function (arrays, functions, objects, strings) {
    return {
        'arrays': {
            'contains': arrays.contains,
            'distinct': arrays.distinct,
            'flatMap': arrays.flatMap,
            'single': arrays.single,
            'singleOrNull': arrays.singleOrNull,
            'stableSort': arrays.stableSort
        },
        'functions': {
            'constant': functions.constant,
            'identity': functions.identity,
            'nop': functions.nop,
            'null': functions.null,
            'true': functions.true,
            'false': functions.false,
            'zero': functions.zero
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
