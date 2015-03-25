'use strict';

require(['require', 'chai'], function (require, chai) {
    mocha.setup('bdd');

    window.expect = chai.expect;

    require(['arrays/arrays.test', 'functions/functions.test'], function () {
        window.__karma__.start();
    });

});
