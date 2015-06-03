require.config({
    baseUrl:'src/main',
    paths: {
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.6.0/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min',
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