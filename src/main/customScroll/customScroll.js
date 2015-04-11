define(['react', 'lodash', './customScroll.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'customScroll',
        getInitialState: function(){
            return {
                scrollPos: 0,
                mounted: false
            };
        },
        componentDidMount: function(){
            this.setState({
                mounted: true
            });
        },
        getScrollbarWidth: function(){
            if (!this.state.mounted){
                return 0;
            }
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            return contentWrapper.offsetWidth - contentWrapper.clientWidth;
        },
        render: template
    });
});
