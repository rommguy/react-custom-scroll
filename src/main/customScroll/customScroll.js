define(['react', 'lodash', './customScroll.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'customScroll',
        getInitialState: function () {
            this.scrollbarWidth = 0;
            return {
                scrollPos: 0
            };
        },
        componentDidMount: function () {
            this.forceUpdate();
        },
        componentWillUpdate: function () {
            if (!this.isMounted()) {
                this.scrollbarWidth = 0;
            }
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            this.scrollbarWidth = contentWrapper.offsetWidth - contentWrapper.clientWidth;
            this.scrollHandleHeight = contentWrapper.clientHeight * contentWrapper.clientHeight / contentWrapper.scrollHeight;
        },
        render: template
    });
});
