'use strict';

define(['./arrays', './functions', './objects', './strings'], function (arrays, functions, objects, strings) {
    return {
        'arrays': {
            'contains': arrays.contains,
            'flatMap': arrays.flatMap,
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
