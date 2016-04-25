'use strict';
var React = require('react');
var reactDOM = require('react-dom');

function ensureWithinLimits(value, min, max) {
    min = (!min && min !== 0) ? value : min;
    max = (!max && max !== 0) ? value : max;
    if (min > max) {
        console.error('min limit is greater than max limit');
        return value;
    }
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}

module.exports = React.createClass({
    displayName: 'customScroll',
    propTypes: {
        allowOuterScroll: React.PropTypes.bool,
        heightRelativeToParent: React.PropTypes.string,
        onScroll: React.PropTypes.func,
        addScrolledClass: React.PropTypes.bool,
        freezePosition: React.PropTypes.bool,
        handleClass: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            handleClass: 'inner-handle'
        };
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
        var domNode = reactDOM.findDOMNode(this);
        var boundingRect = domNode.getBoundingClientRect();
        var innerContainer = this.getScrolledElement();
        var contentHeight = innerContainer.scrollHeight;

        this.scrollbarYWidth = innerContainer.offsetWidth - innerContainer.clientWidth;
        this.visibleHeight = innerContainer.clientHeight;
        this.scrollRatio = contentHeight ? this.visibleHeight / contentHeight : 1;

        this.toggleScrollIfNeeded(contentHeight);

        this.position = {
            top: boundingRect.top + window.pageYOffset,
            left: boundingRect.left + window.pageXOffset
        };

        this.freezePosition(prevProps);
    },
    componentWillUnmount: function () {
        document.removeEventListener('mousemove', this.onHandleDrag);
        document.removeEventListener('mouseup', this.onHandleDragEnd);
    },
    freezePosition: function (prevProps) {
        var innerContainer = this.getScrolledElement();
        var contentWrapper = this.refs.contentWrapper;

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
        var scrollHandle = reactDOM.findDOMNode(this.refs.scrollHandle);
        return event.target === scrollHandle || event.target.parentElement === scrollHandle;
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
    adjustCustomScrollPosToContentPos: function (scrollPosition) {
        this.setState({
            scrollPos: scrollPosition
        });
    },
    onScroll: function (event) {
        if (this.props.freezePosition) {
            return;
        }
        this.adjustCustomScrollPosToContentPos(event.currentTarget.scrollTop);
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    },
    getScrolledElement: function () {
        return this.refs.innerContainer;
    },
    onHandleMouseDown: function (event) {
        this.startDragHandlePos = this.getScrollHandleStyle().top;
        this.startDragMousePos = event.pageY;
        this.setState({
            onDrag: true
        });
        document.addEventListener('mousemove', this.onHandleDrag);
        document.addEventListener('mouseup', this.onHandleDragEnd);
    },
    onHandleDrag: function (event) {
        event.preventDefault();
        var mouseDeltaY = event.pageY - this.startDragMousePos;
        var handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight);
        var newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);
        this.updateScrollPosition(newScrollValue);
    },
    onHandleDragEnd: function (e) {
        this.setState({
            onDrag: false
        });
        e.preventDefault();
        document.removeEventListener('mousemove', this.onHandleDrag);
        document.removeEventListener('mouseup', this.onHandleDragEnd);
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
    getInnerContainerClasses: function () {
        var res = 'inner-container';
        if (this.state.scrollPos && this.props.addScrolledClass) {
            res += ' content-scrolled';
        }
        return res;
    },
    getScrollStyles: function () {
        var scrollSize = this.scrollbarYWidth || 20;
        var innerContainerStyle = {
            marginRight: (-1 * scrollSize),
            height: this.props.heightRelativeToParent ? '100%' : ''
        };
        var contentWrapperStyle = {
            marginRight: this.scrollbarYWidth ? 0 : scrollSize,
            height: this.props.heightRelativeToParent ? '100%' : '',
            overflowY: this.props.freezePosition ? 'hidden' : 'visible'
        };

        return {
            innerContainer: innerContainerStyle,
            contentWrapper: contentWrapperStyle
        };
    },
    getOuterContainerStyle: function () {
        return {
            height: this.props.heightRelativeToParent ? '100%' : ''
        };
    },
    render: function () {
        var scrollStyles = this.getScrollStyles();
        var rootStyle = {
            height: this.props.heightRelativeToParent
        };

        return (
            <div className={'custom-scroll ' + (this.state.onDrag ? 'scroll-handle-dragged' : '')}
                 style={rootStyle}>
                <div className="outer-container" style={this.getOuterContainerStyle()}>
                    {this.hasScroll ? (<div className="custom-scrollbar" onClick={this.onCustomScrollClick} key="scrollbar">
                        <div ref="scrollHandle" className="custom-scroll-handle" style={this.getScrollHandleStyle()}
                             onMouseDown={this.onHandleMouseDown}>
                            <div className="inner-handle"></div>
                        </div>
                    </div>) : null}
                    <div ref="innerContainer"
                         className={this.getInnerContainerClasses()}
                         style={scrollStyles.innerContainer}
                         onScroll={this.onScroll}
                         onWheel={this.blockOuterScroll}>
                        <div className="content-wrapper"
                             ref="contentWrapper"
                             style={scrollStyles.contentWrapper}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

