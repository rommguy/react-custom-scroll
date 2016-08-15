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
        getText: function () {
            return demoText.text;
        },
        isFlexExample: function () {
            return getParameterByName('flex');
        },
        render: template
    });
});
