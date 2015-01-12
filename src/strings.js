'use strict';

define([], function () {
    return {
        convertCamelToHyphenCase: camelCased => camelCased.replace(/([A-Z])/g, match => '-' + match.toLowerCase()),
        convertHyphenToCamelCase: hyphenCased => hyphenCased.replace(/-([a-z])/g, match => match[1].toUpperCase()),
        format: function (formatString) {
            var args = arguments;
            return formatString.replace(/{(\d+)}/g, function (match, number) {
                var argumentIndex = parseInt(number, 10) + 1;
                return typeof args.length <= argumentIndex ? match : args[argumentIndex];
            });
        }
    };
});