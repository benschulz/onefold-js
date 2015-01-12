'use strict';

require(['require', 'chai'], function (require, chai) {
    mocha.setup('bdd');

    window.expect = chai.expect;

    require(['arrays/arrays', 'functions/functions'], function () {
        window.__karma__.start();
    });

});
