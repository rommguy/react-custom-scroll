require.config({
    baseUrl:'src/main',
    paths: {
        lodash: '../../node_modules/lodash/dist/lodash',
        react: '../../node_modules/react/dist/react-with-addons'
    },
    shim: {
        lodash: { exports: '_' },
        react: {exports: 'React'}
    },
    map: {
        '*': {
            'react/addons': 'react'
        }
    }
});

require(['firstScript'], function(firstScript){
    firstScript.doSomething();
})