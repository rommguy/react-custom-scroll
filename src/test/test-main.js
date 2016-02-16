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

    var cdnPrefix = 'https://';

    require.config({
        baseUrl: '/base/src/main',
        paths: {
            lodash: cdnPrefix + 'cdnjs.cloudflare.com/ajax/libs/lodash.js/3.6.0/lodash.min',
            react: cdnPrefix + 'cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-with-addons',
            'react-dom': cdnPrefix + 'cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom',
            jquery: cdnPrefix + 'code.jquery.com/jquery-2.1.4.min'
        },
        shim: {
            lodash: {exports: '_'},
            jquery: {exports: '$'},
            react: {exports: 'React'}
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