define(['react', 'lodash', './demoText', './firstComp.rt'], function (React, _, demoText, template) {
    'use strict';

    return React.createClass({
        displayName: 'firstComp',
        getText: function () {
            return demoText.text;
        },
        render: template
    });
});
