'use strict';
const createReactClass = require('create-react-class')
const _ = require('lodash');
const demoText = require('./demoText');
const template = require('./firstComp.rt.js');

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${ name }(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return false;
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


module.exports = createReactClass({
    displayName: 'firstComp',
    getInitialState() {
        return {
            dynamicContentCounter: 4
        };
    },
    getText() {
        return demoText.text;
    },
    getDynamicContent() {
        return _.times(this.state.dynamicContentCounter, function (index) {
            return `Content #${ index}`;
        });
    },
    addContent() {
        this.setState({
            dynamicContentCounter: this.state.dynamicContentCounter + 1
        });
    },
    removeContent() {
        this.setState({
            dynamicContentCounter: Math.max(this.state.dynamicContentCounter - 1, 4)
        });
    },
    getExamplesToDisplay() {
        const isFlex = getParameterByName('flex');
        const isDynamic = getParameterByName('dynamic');

        return {
            flex: isFlex,
            dynamic: isDynamic,
            standard: !isFlex && !isDynamic
        };
    },
    render: template
});
// });
