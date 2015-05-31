define(['react', 'lodash', 'jquery', './customScroll.rt'], function (React, _, $, template) {
    'use strict';


    function ensureWithinLimits(value, min, max){
        min = _.isUndefined(min) ? value : min;
        max = _.isUndefined(max) ? value : max;
        if (min > max){
            throw 'min limit is greater than max limit';
        }

        if (value < min) {
            return min;
        }
        if (value > max){
            return max;
        }

        return value;
    }

    return React.createClass({
        displayName: 'customScroll',
        propTypes: {
            allowOuterScroll: React.PropTypes.bool,
            heightRelativetoParent: React.PropTypes.string,
            onScroll: React.PropTypes.func,
            addScrolledClass: React.PropTypes.bool
        },
        getInitialState: function () {
            this.scrollbarYWidth = 0;
            this.scrollbarXHeight = 0;
            return {
                scrollPos: 0,
                onDrag: false
            };
        },
        componentDidMount: function () {
            this.forceUpdate();
        },
        componentDidUpdate: function () {
            var domNode = this.getDOMNode();
            var boundingRect = domNode.getBoundingClientRect();
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            var contentHeight = contentWrapper.scrollHeight;
            this.scrollbarYWidth = contentWrapper.offsetWidth - contentWrapper.clientWidth;
            this.scrollbarXHeight = contentWrapper.offsetHeight - contentWrapper.clientHeight;
            this.visibleHeight = contentWrapper.clientHeight;
            this.scrollRatio = contentHeight ? this.visibleHeight / contentHeight : 1;

            this.toggleScrollIfNeeded();

            this.position = {
                top: boundingRect.top + $(window).scrollTop(),
                left: boundingRect.left + $(window).scrollLeft()
            };
        },
        toggleScrollIfNeeded: function () {
            var shouldHaveScroll = this.scrollRatio < 1;
            if (this.hasScroll !== shouldHaveScroll) {
                this.hasScroll = shouldHaveScroll;
                this.forceUpdate();
            }
        },
        getScrollTop: function() {
            return this.refs.innerContainer.getDOMNode().scrollTop;
        },
        updateScrollPosition: function (scrollValue) {
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            contentWrapper.scrollTop = scrollValue;
            this.setState({
                scrollPos: scrollValue
            });
        },
        onCustomScrollClick: function (event) {
            if (this.refs.scrollHandle.getDOMNode() === event.target) {
                return;
            }
            var relativeClickPosition = {
                x: event.pageX - this.position.left,
                y: event.pageY - this.position.top
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
        scrollTo: function(scrollPosition){
            this.setState({
                scrollPos: scrollPosition
            });
        },
        onScroll: function (event) {
            this.scrollTo(event.currentTarget.scrollTop);
            if (this.props.onScroll) {
                this.props.onScroll(event);
            }
        },
        getScrolledElement: function(){
            return this.refs.innerContainer.getDOMNode();
        },
        onHandleMouseDown: function(event){
            this.startDragHandlePos = this.getScrollHandleStyle().top;
            this.startDragMousePos = event.pageY;
            this.setState({
                onDrag: true
            });
            $(document).on('mousemove', this.onHandleDrag);
            $(document).on('mouseup', this.onHandleDragEnd);
        },
        onHandleDrag: function(event){
            var mouseDeltaY = event.pageY - this.startDragMousePos;
            var handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight);
            var newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);
            this.updateScrollPosition(newScrollValue);
        },
        onHandleDragEnd: function(){
            this.setState({
                onDrag: false
            });
            $(document).off('mousemove', this.onHandleDrag);
            $(document).off('mouseup', this.onHandleDragEnd);
        },
        blockOuterScroll: function (e) {
            if (this.props.allowOuterScroll){
                return;
            }
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
        getScrollstyles: function(){
            var scrollSize = this.scrollbarYWidth || 20;
            var innerContainerStyle = {
                'marginRight': (-1 * scrollSize) + 'px',
                'marginBottom': (-1 * this.scrollbarXHeight) + 'px',
                height: this.props.heightRelativetoParent ? '100%' : ''
            };
            var contentWrapperStyle = this.scrollbarYWidth ? {} : {
                'marginRight': scrollSize + 'px',
                'marginBottom': this.scrollbarXHeight + 'px',
                height: this.props.heightRelativetoParent ? '100%' : ''
            };

            return {
                innerContainer: innerContainerStyle,
                contentWrapper: contentWrapperStyle
            };
        },
        getOuterContainerStyle: function() {
            return {
                height: this.props.heightRelativetoParent ? '100%' : ''
            };
        },
        render: template
    });
});

