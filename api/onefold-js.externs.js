/**
 * @namespace
 * @suppress {duplicate}
 */
var onefold = onefold || {};

/** @namespace */
onefold.js = {};

/** @namespace */
onefold.js.objects = {};

/**
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
onefold.js.objects.areEqual = function (a, b) { };

/**
 * @param {Object} object
 * @param {...Object} extensions
 * @returns {Object}
 */
onefold.js.objects.extend = function (object, extensions) {};

/**
 * @param {Object} owner
 * @param {function(string, *)} action
 * @returns {undefined}
 */
onefold.js.objects.forEachProperty = function (owner, action) {};

/**
 * @param {Object} owner
 * @param {string} propertyName
 * @returns {boolean}
 */
onefold.js.objects.hasOwn = function (owner, propertyName) {};

/**
 * @param {Object} source
 * @param {function(*, string, *):*} mapper
 * @returns {Object}
 */
onefold.js.objects.mapProperties = function (source, mapper) {};

/** @namespace */
onefold.js.arrays = {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {E} value
 * @returns {boolean}
 */
onefold.js.arrays.contains = function (array, value) {};

/**
 * @template E
 * @param {Array<E>} array
 * @returns {Array<E>}
 */
onefold.js.arrays.distinct = function (array) {};

/**
 * @template E, I
 * @param {Array<E>} array
 * @param {function(E):Array<I>} mapper
 * @returns {Array<I>}
 */
onefold.js.arrays.flatMap = function (array, mapper) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E):boolean} predicate
 * @returns {E}
 */
onefold.js.arrays.single = function (array, predicate) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E):boolean} predicate
 * @returns {?E}
 */
onefold.js.arrays.singleOrNull= function (array, predicate) {};

/**
 * @template E
 * @param {Array<E>} array
 * @param {function(E, E):number} comparator
 * @returns {Array<E>}
 */
onefold.js.arrays.stableSort = function (array, comparator) {};

/** @namespace */
onefold.js.functions = {};

/**
 * @template T
 * @param {T} value
 * @returns {function():T}
 */
onefold.js.functions.constant = function (value) { };

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
onefold.js.functions.identity = function (value) { };

/** @namespace */
onefold.js.strings = {};

/**
 * @param {string} camelCased
 * @returns {string}
 */
onefold.js.strings.convertCamelToHyphenCase = function (camelCased) {};

/**
 * @param {string} hyphenCased
 * @returns {string}
 */
onefold.js.strings.convertHyphenToCamelCase = function (hyphenCased) {};

/**
 * @param {string} formatString
 * @param {...*} args
 * @returns {string}
 */
onefold.js.strings.format = function (formatString, args) {};
