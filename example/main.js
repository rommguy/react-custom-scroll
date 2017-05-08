require.config({
    baseUrl: '',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-with-addons',
        'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min',
        'prop-types': '../node_modules/prop-types/prop-types',
        customScroll: '../dist/reactCustomScroll'
    },
    shim: {
        lodash: {exports: '_'},
        react: {exports: 'React'},
        'react-dom': {exports: 'ReactDOM'}
    },
    map: {
        '*': {
            'react/addons': 'react'
        }
    }
});

require(['react-dom', 'react', './firstComp/firstComp'], function (ReactDOM, React, firstComp) {
    'use strict';
    ReactDOM.render(React.createElement(firstComp), document.getElementById('body'));
});
