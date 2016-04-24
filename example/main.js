require.config({
    baseUrl: '',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min',
        react: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons',
        'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min',
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
