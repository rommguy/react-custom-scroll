define(['react', 'reactDOM', 'lodash', 'jquery', './customScroll.rt'], function (React, reactDOM, _, $, template) {
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
            addScrolledClass: React.PropTypes.bool,
            freezePosition: React.PropTypes.bool
        },
        getInitialState: function () {
            this.scrollbarYWidth = 0;
            return {
                scrollPos: 0,
                onDrag: false
            };
        },
        componentDidMount: function () {
            this.forceUpdate();
        },
        componentDidUpdate: function (prevProps) {
            var domNode = reactDOM.findDOMNode(this)
            var boundingRect = domNode.getBoundingClientRect();
            var innerContainer = this.getScrolledElement();
            var contentHeight = innerContainer.scrollHeight;

            this.scrollbarYWidth = innerContainer.offsetWidth - innerContainer.clientWidth;
            this.visibleHeight = innerContainer.clientHeight;
            this.scrollRatio = contentHeight ? this.visibleHeight / contentHeight : 1;

            this.toggleScrollIfNeeded(contentHeight);

            this.position = {
                top: boundingRect.top + $(window).scrollTop(),
                left: boundingRect.left + $(window).scrollLeft()
            };

            this.freezePosition(prevProps);
        },
        componentWillUnmount: function () {
            $(document).off('mousemove', this.onHandleDrag);
            $(document).off('mouseup', this.onHandleDragEnd);
        },
        freezePosition: function (prevProps) {
            var innerContainer = this.getScrolledElement();
            var contentWrapper = reactDOM.findDOMNode(this.refs.contentWrapper);

            if (this.props.freezePosition) {
                contentWrapper.scrollTop = this.state.scrollPos;
            }

            if (prevProps.freezePosition) {
                innerContainer.scrollTop = this.state.scrollPos;
            }
        },
        toggleScrollIfNeeded: function (contentHeight) {
            var shouldHaveScroll = contentHeight - this.visibleHeight > 1;
            if (this.hasScroll !== shouldHaveScroll) {
                this.hasScroll = shouldHaveScroll;
                this.forceUpdate();
            }
        },
        getScrollTop: function () {
            return this.getScrolledElement().scrollTop;
        },
        updateScrollPosition: function (scrollValue) {
            var innerContainer = this.getScrolledElement();
            innerContainer.scrollTop = scrollValue;
            this.setState({
                scrollPos: scrollValue
            });
        },
        onCustomScrollClick: function (event) {
            if (this.isClickOnScrollHandle(event)) {
                return;
            }
            var newScrollHandleTop = this.calculateNewScrollHandleTop(event);
            var newScrollValue = this.getScrollValueFromHandlePosition(newScrollHandleTop);

            this.updateScrollPosition(newScrollValue);
        },
        isClickOnScrollHandle: function (event) {
            return event.target === reactDOM.findDOMNode(this.refs.scrollHandle);
        },
        calculateNewScrollHandleTop: function (clickEvent) {
            var clickYRelativeToScrollbar = clickEvent.pageY - this.position.top;
            var scrollHandleTop = this.getScrollHandleStyle().top;
            var newScrollHandleTop;
            var isBelowHandle = clickYRelativeToScrollbar > (scrollHandleTop + this.scrollHandleHeight);
            if (isBelowHandle) {
                newScrollHandleTop = scrollHandleTop + Math.min(this.scrollHandleHeight, this.visibleHeight - this.scrollHandleHeight);
            } else {
                newScrollHandleTop = scrollHandleTop - Math.max(this.scrollHandleHeight, 0);
            }
            return newScrollHandleTop;
        },
        getScrollValueFromHandlePosition: function (handlePosition) {
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
        scrollTo: function (scrollPosition) {
            this.setState({
                scrollPos: scrollPosition
            });
        },
        onScroll: function (event) {
            if (this.props.freezePosition) {
                return;
            }
            this.scrollTo(event.currentTarget.scrollTop);
            if (this.props.onScroll) {
                this.props.onScroll(event);
            }
        },
        getScrolledElement: function () {
            return reactDOM.findDOMNode(this.refs.innerContainer);
        },
        onHandleMouseDown: function (event) {
            this.startDragHandlePos = this.getScrollHandleStyle().top;
            this.startDragMousePos = event.pageY;
            this.setState({
                onDrag: true
            });
            $(document).on('mousemove', this.onHandleDrag);
            $(document).on('mouseup', this.onHandleDragEnd);
        },
        onHandleDrag: function (event) {
            var mouseDeltaY = event.pageY - this.startDragMousePos;
            var handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight);
            var newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);
            this.updateScrollPosition(newScrollValue);
        },
        onHandleDragEnd: function () {
            this.setState({
                onDrag: false
            });
            $(document).off('mousemove', this.onHandleDrag);
            $(document).off('mouseup', this.onHandleDragEnd);
        },
        blockOuterScroll: function (e) {
            if (this.props.allowOuterScroll) {
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
        getScrollStyles: function () {
            var scrollSize = this.scrollbarYWidth || 20;
            var innerContainerStyle = {
                marginRight: (-1 * scrollSize) + 'px',
                height: this.props.heightRelativetoParent ? '100%' : ''
            };
            var contentWrapperStyle = {
                marginRight: this.scrollbarYWidth ? 0 : (scrollSize + 'px'),
                height: this.props.heightRelativetoParent ? '100%' : '',
                overflowY: this.props.freezePosition ? 'hidden' : 'visible'
            };

            return {
                innerContainer: innerContainerStyle,
                contentWrapper: contentWrapperStyle
            };
        },
        getOuterContainerStyle: function () {
            return {
                height: this.props.heightRelativetoParent ? '100%' : ''
            };
        },
        render: template
    });
});

