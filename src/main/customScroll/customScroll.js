define(['react', './customScroll.rt'], function (React, template) {
    'use strict';

    return React.createClass({
        displayName: 'customScroll',
        getInitialState: function () {
            this.scrollbarYWidth = 0;
            this.scrollbarXWidth = 0;
            return {
                scrollPos: 0
            };
        },
        componentDidMount: function () {
            this.forceUpdate();
        },
        componentWillUpdate: function () {
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            var contentHeight = contentWrapper.scrollHeight;
            this.scrollbarYWidth = contentWrapper.offsetWidth - contentWrapper.clientWidth;
            this.scrollbarXWidth = contentWrapper.offsetHeight - contentWrapper.clientHeight;
            this.visibleHeight = contentWrapper.clientHeight;
            this.scrollRatio = contentHeight ? this.visibleHeight / contentHeight : 1;
            this.hasScroll = this.scrollRatio < 1;
        },
        getScrollHandleStyle: function (){
            var handlePosition = this.state.scrollPos * this.scrollRatio;
            var scrollHandleHeight = this.visibleHeight * this.scrollRatio;
            return {
                height: scrollHandleHeight,
                top: handlePosition
            };
        },
        onScroll: function (e) {
            this.setState({
                scrollPos: e.currentTarget.scrollTop
            });
        },
        blockOuterScroll: function(e){
            var contentNode = e.currentTarget;
            var totalHeight = e.currentTarget.scrollHeight;
            var maxScroll = totalHeight - e.currentTarget.offsetHeight;
            var delta = e.deltaY % 3 ? (e.deltaY) : (e.deltaY * 10);
            if (contentNode.scrollTop + delta <= 0) {
                contentNode.scrollTop = 0;
                e.preventDefault();
            } else if (contentNode.scrollTop + delta >= maxScroll) {
                contentNode.scrollTop = maxScroll;
                e.preventDefault();
            }
            e.stopPropagation();
        },
        render: template
    });
});
