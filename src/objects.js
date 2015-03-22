'use strict';

define([], function () {
    return {
        areEqual: areEqual,
        extend: extend,
        forEachProperty: forEachProperty,
        hasOwn: hasOwn,
        mapProperties: mapProperties
    };

    function areEqual(a, b) {
        if (a === b)
            return true;

        var aHasValue = !!a && typeof a.valueOf === 'function';
        var bHasValue = !!b && typeof b.valueOf === 'function';
        return aHasValue && bHasValue && a.valueOf() === b.valueOf();
    }

    function extend(object, extensions) {
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
            var keys = Object.keys(source);
            for (var i = 0, length = keys.length; i < length; i++) {
                var key = keys[i];
                var descriptor = Object.getOwnPropertyDescriptor(source, key);
                if (descriptor !== undefined && descriptor.enumerable)
                    Object.defineProperty(object, key, descriptor);
            }
        });
        return object;
    }

    function forEachProperty(owner, action) {
        for (var propertyName in owner)
            if (hasOwn(owner, propertyName))
                action(propertyName, owner[propertyName]);
    }

    function hasOwn(owner, propertyName) {
        return Object.prototype.hasOwnProperty.call(owner, propertyName);
    }

    function mapProperties(source, mapper) {
        var destination = {};
        for (var propertyName in source)
            if (hasOwn(source, propertyName))
                destination[propertyName] = mapper(source[propertyName], propertyName, source);
        return destination;
    }

});