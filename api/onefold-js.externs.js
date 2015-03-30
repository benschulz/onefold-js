/** @namespace */
de.benshu.onefold.js = {};

/** @namespace */
de.benshu.onefold.js.objects = {};

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
de.benshu.onefold.js.objects.areEqual = function (a, b) { };

/**
 * @param {Object} object
 * @param {...Object} extensions
 * @returns {Object}
 */
de.benshu.onefold.js.objects.extend = function (object, extensions) {};

/**
 * @param {Object} owner
 * @param {function(string, *)} action
 * @returns {undefined}
 */
de.benshu.onefold.js.objects.forEachProperty = function (owner, action) {};

/**
 * @param {Object} owner
 * @param {string} propertyName
 * @returns {boolean}
 */
de.benshu.onefold.js.objects.hasOwn = function (owner, propertyName) {};

/**
 * @param {Object} source
 * @param {function(*, string, *):*} mapper
 * @returns {Object}
 */
de.benshu.onefold.js.objects.mapProperties = function (source, mapper) {};

/** @namespace */
de.benshu.onefold.js.arrays = {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {E} value
 * @returns {boolean}
 */
de.benshu.onefold.js.arrays.contains = function (array, value) {};

/**
 * @template E
 * @param {Array<E>} array
 * @returns {Array<E>}
 */
de.benshu.onefold.js.arrays.distinct = function (array) {};

/**
 * @template E, I
 * @param {Array<E>} array
 * @param {function(E):Array<I>} mapper
 * @returns {Array<I>}
 */
de.benshu.onefold.js.arrays.flatMap = function (array, mapper) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E):boolean} predicate
 * @returns {E}
 */
de.benshu.onefold.js.arrays.single = function (array, predicate) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E):boolean} predicate
 * @returns {?E}
 */
de.benshu.onefold.js.arrays.singleOrNull= function (array, predicate) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E, E):number} comparator
 * @returns {Array<E>}
 */
de.benshu.onefold.js.arrays.stableSort = function (array, comparator) {};

/** @namespace */
de.benshu.onefold.js.functions = {};

/**
 * @template T
 * @param {T} value
 * @returns {function():T}
 */
de.benshu.onefold.js.functions.constant = function (value) { };

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
de.benshu.onefold.js.functions.identity = function (value) { };

/** @namespace */
de.benshu.onefold.js.strings = {};

/**
 * @param {string} camelCased
 * @returns {string}
 */
de.benshu.onefold.js.strings.convertCamelToHyphenCase = function (camelCased) {};

/**
 * @param {string} hyphenCased
 * @returns {string}
 */
de.benshu.onefold.js.strings.convertHyphenToCamelCase = function (hyphenCased) {};

/**
 * @param {string} formatString
 * @param {...*} args
 * @returns {string}
 */
de.benshu.onefold.js.strings.format = function (formatString, args) {};
