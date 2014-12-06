var tests = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        tests.push(pathToModule(file));
    }
});

require.config({
    baseUrl:'base',
    paths: {
        'lodash': 'node_modules/lodash/lodash'
    },
    shim: {
        'lodash': { exports: '_' }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
