require.config({
    baseUrl:'src/main',
    paths: {
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        react: '//fb.me/react-with-addons-0.12.2'
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