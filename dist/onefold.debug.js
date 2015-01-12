/**
 * @license Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
;(function(factory) {
    if (typeof define === 'function' && define['amd'])
        define([], factory);
    else
        window['onefold-js'] = factory();
} (function() {
var onefold_js_arrays, onefold_js_functions, onefold_js_objects, onefold_js_strings, onefold_js_onefold, onefold_js;

onefold_js_arrays = function () {
  function naturalComparator(a, b) {
    return a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function' ? a.valueOf() <= b.valueOf() ? a.valueOf() < b.valueOf() ? -1 : 0 : 1 : a <= b ? a < b ? -1 : 0 : 1;
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
    contains: function (array, value) {
      return array.indexOf(value) >= 0;
    },
    flatMap: function (array, mapping) {
      return Array.prototype.concat.apply([], array.map(mapping));
    },
    stableSort: function (array, comparator) {
      return stableSort(array, comparator || naturalComparator, true);
    }
  };
}();

onefold_js_functions = function () {
  var constant = function (x) {
    return function () {
      return x;
    };
  };
  return {
    true: constant(true),
    false: constant(false),
    nop: constant(undefined),
    null: constant(null),
    zero: constant(0),
    constant: constant,
    identity: function (x) {
      return x;
    }
  };
}();

onefold_js_objects = function () {
  function hasOwn(owner, propertyName) {
    return Object.prototype.hasOwnProperty.call(owner, propertyName);
  }
  function forEachProperty(owner, action) {
    for (var propertyName in owner)
      if (hasOwn(owner, propertyName))
        action(propertyName, owner[propertyName]);
  }
  return {
    areEqual: function (a, b) {
      return a === b || !!(a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function' && a.valueOf() === b.valueOf());
    },
    extend: function (target) {
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
}();

onefold_js_strings = {
  convertCamelToHyphenCase: function (camelCased) {
    return camelCased.replace(/([A-Z])/g, function (match) {
      return '-' + match.toLowerCase();
    });
  },
  convertHyphenToCamelCase: function (hyphenCased) {
    return hyphenCased.replace(/-([a-z])/g, function (match) {
      return match[1].toUpperCase();
    });
  },
  format: function (formatString) {
    var args = arguments;
    return formatString.replace(/{(\d+)}/g, function (match, number) {
      var argumentIndex = parseInt(number, 10) + 1;
      return typeof args.length <= argumentIndex ? match : args[argumentIndex];
    });
  }
};

onefold_js_onefold = function (arrays, functions, objects, strings) {
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
      'hasOwn': objects.hasOwn
    },
    'strings': {
      'convertCamelToHyphenCase': strings.convertCamelToHyphenCase,
      'convertHyphenToCamelCase': strings.convertHyphenToCamelCase
    }
  };
}(onefold_js_arrays, onefold_js_functions, onefold_js_objects, onefold_js_strings);
onefold_js = function (main) {
  return main;
}(onefold_js_onefold);return onefold_js;
}));