define(['react', 'lodash', './customScroll.rt'], function (React, _, template) {
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
            var domNode = React.findDOMNode(this);
            var boundingRect = domNode.getBoundingClientRect();
            var contentWrapper = React.findDOMNode(this.refs.innerContainer);
            var contentHeight = contentWrapper.scrollHeight;
            this.scrollbarYWidth = contentWrapper.offsetWidth - contentWrapper.clientWidth;
            this.scrollbarXWidth = contentWrapper.offsetHeight - contentWrapper.clientHeight;
            this.visibleHeight = contentWrapper.clientHeight;
            this.scrollRatio = contentHeight ? this.visibleHeight / contentHeight : 1;
            this.hasScroll = this.scrollRatio < 1;

            this.position = {
                top: boundingRect.top + window.scrollY,
                left: boundingRect.left + window.scrollX
            };
        },
        updateScrollPosition: function (scrollValue) {
            var contentWrapper = React.findDOMNode(this.refs.innerContainer);
            contentWrapper.scrollTop = scrollValue;
            this.setState({
                scrollPos: scrollValue
            });
        },
        onCustomScrollClick: function (e) {
            if (React.findDOMNode(this.refs.scrollHandle) === e.target) {
                return;
            }
            var relativeClickPosition = {
                x: e.pageX - this.position.left,
                y: e.pageY - this.position.top
            };
            var handleTopPosition = this.getScrollHandleStyle().top;
            var isBelowHandle = relativeClickPosition.y > (handleTopPosition + this.scrollHandleHeight);
            if (isBelowHandle) {
                handleTopPosition += Math.min(this.scrollHandleHeight, this.visibleHeight - this.scrollHandleHeight);
            } else {
                handleTopPosition -= Math.max(this.scrollHandleHeight, 0);
            }
            var newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);

            this.updateScrollPosition(newScrollValue);
        },
        getScrollValueFromHandlePosition: function(handlePosition){
            return (handlePosition) / this.scrollRatio;
        },
        getScrollHandleStyle: function () {
            var handlePosition = this.state.scrollPos * this.scrollRatio;
            this.scrollHandleHeight = this.visibleHeight * this.scrollRatio;
            return {
                height: this.scrollHandleHeight,
                top: handlePosition
            };
        },

        onScroll: function (e) {
            this.setState({
                scrollPos: e.currentTarget.scrollTop
            });
        },
        blockOuterScroll: function (e) {
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
