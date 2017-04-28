define(['react', 'lodash', './demoText', './firstComp.rt'], function (React, _, demoText, template) {
    'use strict';

    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return false;
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }


    return React.createClass({
        displayName: 'firstComp',
        getInitialState: function () {
            return {
                dynamicContentCounter: 4
            };
        },
        getText: function () {
            return demoText.text;
        },
        getDynamicContent: function () {
            return _.times(this.state.dynamicContentCounter, function (index) {
                return 'Content #' + index;
            });
        },
        addContent: function () {
            this.setState({
                dynamicContentCounter: this.state.dynamicContentCounter + 1
            });
        },
        removeContent: function () {
            this.setState({
                dynamicContentCounter: Math.max(this.state.dynamicContentCounter - 1, 4)
            });
        },
        getExamplesToDisplay: function () {
            var isFlex = getParameterByName('flex');
            var isDynamic = getParameterByName('dynamic');

            return {
                flex: isFlex,
                dynamic: isDynamic,
                standard: !isFlex && !isDynamic
            };
        },
        render: template
    });
});
