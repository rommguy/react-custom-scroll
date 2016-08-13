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

function isEventPosOnDomNode(event, domNode) {
    const nodeClientRect = domNode.getBoundingClientRect();
    return (event.clientX > nodeClientRect.left &&
    event.clientX < nodeClientRect.left + nodeClientRect.width &&
    event.clientY > nodeClientRect.top &&
    event.clientY < nodeClientRect.top + nodeClientRect.height);
}

function enforceMinHandleHeight(calculatedStyle) {
    const minHeight = this.props.minScrollHandleHeight;
    if (calculatedStyle.height >= minHeight) {
        return calculatedStyle;
    }

    const diffHeightBetweenMinAndCalculated = minHeight - calculatedStyle.height;
    const scrollPositionToAvailableScrollRatio = this.state.scrollPos / (this.contentHeight - this.visibleHeight);
    const scrollHandlePosAdjustmentForMinHeight = diffHeightBetweenMinAndCalculated * scrollPositionToAvailableScrollRatio;
    const handlePosition = calculatedStyle.top - scrollHandlePosAdjustmentForMinHeight;

    return {
        height: minHeight,
        top: handlePosition
    };
}

module.exports = React.createClass({
    displayName: 'customScroll',
    propTypes: {
        allowOuterScroll: React.PropTypes.bool,
        heightRelativeToParent: React.PropTypes.string,
        onScroll: React.PropTypes.func,
        addScrolledClass: React.PropTypes.bool,
        freezePosition: React.PropTypes.bool,
        handleClass: React.PropTypes.string,
        minScrollHandleHeight: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            handleClass: 'inner-handle',
            minScrollHandleHeight: 38
        };
    },
    getInitialState() {
        this.scrollbarYWidth = 0;
        return {
            scrollPos: 0,
            onDrag: false
        };
    },
    componentDidMount() {
        this.forceUpdate();
    },
    componentDidUpdate(prevProps) {
        var domNode = reactDOM.findDOMNode(this);
        var boundingRect = domNode.getBoundingClientRect();
        var innerContainer = this.getScrolledElement();
        this.contentHeight = innerContainer.scrollHeight;

        this.scrollbarYWidth = innerContainer.offsetWidth - innerContainer.clientWidth;
        this.visibleHeight = innerContainer.clientHeight;
        this.scrollRatio = this.contentHeight ? this.visibleHeight / this.contentHeight : 1;

        this.toggleScrollIfNeeded();

        this.position = {
            top: boundingRect.top + window.pageYOffset,
            left: boundingRect.left + window.pageXOffset
        };

        this.freezePosition(prevProps);
    },
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onHandleDrag);
        document.removeEventListener('mouseup', this.onHandleDragEnd);
    },
    freezePosition(prevProps) {
        var innerContainer = this.getScrolledElement();
        var contentWrapper = this.refs.contentWrapper;

        if (this.props.freezePosition) {
            contentWrapper.scrollTop = this.state.scrollPos;
        }

        if (prevProps.freezePosition) {
            innerContainer.scrollTop = this.state.scrollPos;
        }
    },
    toggleScrollIfNeeded() {
        var shouldHaveScroll = this.contentHeight - this.visibleHeight > 1;
        if (this.hasScroll !== shouldHaveScroll) {
            this.hasScroll = shouldHaveScroll;
            this.forceUpdate();
        }
    },
    getScrollTop() {
        return this.getScrolledElement().scrollTop;
    },
    updateScrollPosition(scrollValue) {
        var innerContainer = this.getScrolledElement();
        innerContainer.scrollTop = scrollValue;
        this.setState({
            scrollPos: scrollValue
        });
    },
    onClick(event) {
        if (!this.hasScroll || !this.isMouseEventOnCustomScrollbar(event) || this.isMouseEventOnScrollHandle(event)) {
            return;
        }
        const newScrollHandleTop = this.calculateNewScrollHandleTop(event);
        const newScrollValue = this.getScrollValueFromHandlePosition(newScrollHandleTop);

        this.updateScrollPosition(newScrollValue);
    },
    isMouseEventOnCustomScrollbar(event) {
        const customScrollbar = reactDOM.findDOMNode(this.refs.customScrollbar);
        return isEventPosOnDomNode(event, customScrollbar);
    },
    isMouseEventOnScrollHandle(event) {
        const scrollHandle = reactDOM.findDOMNode(this.refs.scrollHandle);
        return isEventPosOnDomNode(event, scrollHandle);
    },
    calculateNewScrollHandleTop(clickEvent) {
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
    getScrollValueFromHandlePosition(handlePosition) {
        return (handlePosition) / this.scrollRatio;
    },
    getScrollHandleStyle() {
        var handlePosition = this.state.scrollPos * this.scrollRatio;
        this.scrollHandleHeight = this.visibleHeight * this.scrollRatio;
        return {
            height: this.scrollHandleHeight,
            top: handlePosition
        };
    },
    adjustCustomScrollPosToContentPos(scrollPosition) {
        this.setState({
            scrollPos: scrollPosition
        });
    },
    onScroll(event) {
        if (this.props.freezePosition) {
            return;
        }
        this.adjustCustomScrollPosToContentPos(event.currentTarget.scrollTop);
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    },
    getScrolledElement() {
        return this.refs.innerContainer;
    },
    onMouseDown(event) {
        if (!this.hasScroll || !this.isMouseEventOnScrollHandle(event)) {
            return;
        }

        this.startDragHandlePos = this.getScrollHandleStyle().top;
        this.startDragMousePos = event.pageY;
        this.setState({
            onDrag: true
        });
        document.addEventListener('mousemove', this.onHandleDrag);
        document.addEventListener('mouseup', this.onHandleDragEnd);
    },
    onHandleDrag(event) {
        event.preventDefault();
        var mouseDeltaY = event.pageY - this.startDragMousePos;
        var handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight);
        var newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);
        this.updateScrollPosition(newScrollValue);
    },
    onHandleDragEnd(e) {
        this.setState({
            onDrag: false
        });
        e.preventDefault();
        document.removeEventListener('mousemove', this.onHandleDrag);
        document.removeEventListener('mouseup', this.onHandleDragEnd);
    },
    blockOuterScroll(e) {
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
    getInnerContainerClasses() {
        var res = 'inner-container';
        if (this.state.scrollPos && this.props.addScrolledClass) {
            res += ' content-scrolled';
        }
        if (this.props.flex) {
            res += ' custom-scroll-flex';
        }
        return res;
    },
    getScrollStyles() {
        var scrollSize = this.scrollbarYWidth || 20;
        var innerContainerStyle = {
            marginRight: (-1 * scrollSize),
            height: this.props.heightRelativeToParent ? '100%' : '',
            flex: this.props.flex || ''
        };
        var contentWrapperStyle = {
            marginRight: this.scrollbarYWidth ? 0 : scrollSize,
            height: this.props.heightRelativeToParent ? '100%' : '',
            overflowY: this.props.freezePosition ? 'hidden' : 'visible',
            flex: this.props.flex || ''
        };

        return {
            innerContainer: innerContainerStyle,
            contentWrapper: contentWrapperStyle
        };
    },
    getOuterContainerStyle() {
        return {
            height: this.props.heightRelativeToParent ? '100%' : '',
            flex: this.props.flex || ''
        };
    },
    getRootClassName() {
        let result = 'custom-scroll';

        if (this.state.onDrag) {
            result += ' scroll-handle-dragged';
        }

        if (this.props.flex) {
            result += ' custom-scroll-flex';
        }

        return result;
    },
    getGenericClassName(className) {
        let result = className;

        if (this.props.flex) {
            result += ' custom-scroll-flex';
        }

        return result;
    },
    render() {
        const scrollStyles = this.getScrollStyles();
        const rootStyle = {
            height: this.props.heightRelativeToParent,
            flex: this.props.flex || ''
        };
        const scrollHandleStyle = enforceMinHandleHeight.call(this, this.getScrollHandleStyle());


        return (
            <div className={this.getRootClassName()}
                 style={rootStyle}>
                <div className={this.getGenericClassName('outer-container')}
                     style={this.getOuterContainerStyle()}
                     onMouseDown={this.onMouseDown}
                     onClick={this.onClick}>
                    {this.hasScroll ? (
                        <div ref="customScrollbar" className="custom-scrollbar" key="scrollbar">
                            <div ref="scrollHandle" className="custom-scroll-handle" style={scrollHandleStyle}>
                                <div className={this.props.handleClass}></div>
                            </div>
                        </div>) : null}
                    <div ref="innerContainer"
                         className={this.getInnerContainerClasses()}
                         style={scrollStyles.innerContainer}
                         onScroll={this.onScroll}
                         onWheel={this.blockOuterScroll}>
                        <div className={this.getGenericClassName('content-wrapper')}
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
