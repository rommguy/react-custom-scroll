require.config({
    baseUrl:'src/main',
    paths: {
        'lodash': '../../node_modules/lodash-amd/modern/main',
        react: '../../node_modules/react/dist/react-with-addons',
        jquery : '//code.jquery.com/jquery-2.1.4.min'
    },
    shim: {
        lodash: { exports: '_' },
        react: {exports: 'React'},
        jquery: { exports: '$' }
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