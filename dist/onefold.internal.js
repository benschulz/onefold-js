/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define([],    function() {
var onefold_js_objects, onefold_js_arrays, onefold_js_strings, onefold_js_internal, onefold_js;

onefold_js_objects = function () {
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
}();

onefold_js_arrays = function (objects) {
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
    return array.length > 50 ? distinctForLargeArrays(array) : distinctForSmallArrays(array);
  }
  function distinctForSmallArrays(array) {
    return array.filter(function (e, i, a) {
      return a.lastIndexOf(e) === i;
    });
  }
  function distinctForLargeArrays(source) {
    var length = source.length, stringLookup = {}, value;
    for (var i = 0; i < length; ++i) {
      value = source[i];
      if (typeof value === 'string') {
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
      if (typeof value === 'string') {
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
    var length = array.length, matchIndex = -1;
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
}(onefold_js_objects);

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

onefold_js_internal = function (arrays, objects, strings) {
  return {
    arrays: arrays,
    objects: objects,
    strings: strings
  };
}(onefold_js_arrays, onefold_js_objects, onefold_js_strings);
onefold_js = function (main) {
  return main;
}(onefold_js_internal);return onefold_js;
});