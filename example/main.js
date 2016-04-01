require.config({
    baseUrl: '',
    paths: {
        lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min',
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-with-addons.min',
        ReactDOM: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.min',
        customScroll: '../dist/reactCustomScroll'
    },
    shim: {
        lodash: {exports: '_'},
        React: {exports: 'React'}
    },
    map: {
        '*': {
            'react/addons': 'React',
            react: 'React'
        }
    }
});

require(['ReactDOM', 'React', './firstComp/firstComp'], function (ReactDOM, React, firstComp) {
    'use strict';
    ReactDOM.render(React.createElement(firstComp), document.getElementById('body'));
});
