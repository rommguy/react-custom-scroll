require.config({
    baseUrl:'src/main',
    paths: {
        lodash: '../../node_modules/lodash/dist/lodash',
        react: '../../node_modules/react/dist/react-with-addons',
        zepto: '../../js-libs/zepto/zepto.min'
    },
    shim: {
        lodash: { exports: '_' },
        react: {exports: 'React'},
        'zepto': { exports: '$' }
    },
    map: {
        '*': {
            'react/addons': 'react'
        }
    }
});

require(['firstScript'], function(firstScript){
    'use strict';
    firstScript.doSomething();
});