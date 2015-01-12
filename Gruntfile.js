'use strict';

module.exports = function (grunt) {
    require('grunt-commons')(grunt, {
        basename: 'onefold',
        name: 'onefold-js',
        main: 'onefold',
        internalMain: 'internal'
    }).initialize({});
};
