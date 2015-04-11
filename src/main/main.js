require.config({
    baseUrl:'src/main',
    paths: {
        'lodash': '../../node_modules/lodash-amd/modern/main',
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

require(['react', './firstComp/firstComp'], function(React, firstComp){
    'use strict';
    React.render(React.createElement(firstComp), document.body);
});