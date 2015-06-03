(function () {
    'use strict';

    var tests = [];
    for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/spec\.js$/i.test(file)) {
                tests.push(file);
            }
        }
    }

    require.config({
        baseUrl: '/base/src/main/',
        paths: {
            'lodash': '../../node_modules/lodash-amd/modern/main',
            'react': '../../node_modules/react/dist/react-with-addons',
            zepto: '../../libs/zepto/zepto.min',
            definition: '../../js-libs/definition/definition'
        },
        shim: {
            'lodash': { exports: '_' },
            'zepto': { exports: '$' },
            'react': { exports: 'React' }
        },
        map: {
            '*': {
                'react/addons': 'react'
            }
        },

        // ask Require.js to load these files (all tests)
        deps: tests,

        // start test run, once Require.js is done
        callback: window.__karma__.start
    });
}());