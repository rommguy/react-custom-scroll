require.config({
    baseUrl:'src/main',
    paths: {
        'lodash': '../../node_modules/lodash/lodash'
    },
    shim: {
        'lodash': { exports: '_' }
    }
});

require(['firstScript'], function(firstScript){
    firstScript.doSomething();
})