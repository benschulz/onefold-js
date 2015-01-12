'use strict';

define([], function () {
    function hasOwn(owner, propertyName) {
        return Object.prototype.hasOwnProperty.call(owner, propertyName);
    }

    function forEachProperty(owner, action) {
        for (var propertyName in owner)
            if (hasOwn(owner, propertyName))
                action(propertyName, owner[propertyName]);
    }

    return {
        areEqual: (a, b) => a === b || !!(a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function' && a.valueOf() === b.valueOf()),
        extend: function (target /*, ...sources*/) {
            Array.prototype.slice.call(arguments, 1).forEach(function (source) {
                var keys = Object.keys(source);
                for (var i = 0, length = keys.length; i < length; i++) {
                    var key = keys[i];
                    var descriptor = Object.getOwnPropertyDescriptor(source, key);
                    if (descriptor !== undefined && descriptor.enumerable)
                        Object.defineProperty(target, key, descriptor);
                }
            });
            return target;
        },
        forEachProperty: forEachProperty,
        hasOwn: hasOwn
    };
});