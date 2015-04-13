define(['react', 'lodash', './customScroll.rt'], function (React, _, template) {
    'use strict';


    function ensureWithinLimits(value, min, max) {
        min = _.isUndefined(min) ? value : min;
        max = _.isUndefined(max) ? value : max;
        if (min > max) {
            throw 'min limit is greater than max limit';
        }

        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }

        return value;
    }

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
            var domNode = this.getDOMNode();
            var boundingRect = domNode.getBoundingClientRect();
            var contentWrapper = this.refs.innerContainer.getDOMNode();
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
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            contentWrapper.scrollTop = scrollValue;
            this.setState({
                scrollPos: scrollValue
            });
        },
        onCustomScrollClick: function (e) {
            var relativeClickPosition = {
                x: e.pageX - this.position.left,
                y: e.pageY - this.position.top
            };
            // if click is below handle - jump 1 * handle Height down
            // else - upward same distance
            this.updateScrollPosition((relativeClickPosition.y - this.scrollHandleHeight / 2) / this.scrollRatio);
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
