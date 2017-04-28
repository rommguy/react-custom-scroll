'use strict';
const React = require('react');
const reactDOM = require('react-dom');

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
        children: React.PropTypes.any,
        allowOuterScroll: React.PropTypes.bool,
        heightRelativeToParent: React.PropTypes.string,
        onScroll: React.PropTypes.func,
        addScrolledClass: React.PropTypes.bool,
        freezePosition: React.PropTypes.bool,
        handleClass: React.PropTypes.string,
        minScrollHandleHeight: React.PropTypes.number,
        flex: React.PropTypes.string,
        rtl: React.PropTypes.bool,
        scrollTo: React.PropTypes.number,
        keepAtBottom: React.PropTypes.bool
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
    componentDidUpdate(prevProps, prevState) {
        const prevContentHeight = this.contentHeight;
        const prevVisibleHeight = this.visibleHeight;
        const domNode = reactDOM.findDOMNode(this);
        const boundingRect = domNode.getBoundingClientRect();
        const innerContainer = this.getScrolledElement();
        const reachedBottomOnPrevRender = prevState.scrollPos >= prevContentHeight - prevVisibleHeight;

        this.contentHeight = innerContainer.scrollHeight;
        this.scrollbarYWidth = innerContainer.offsetWidth - innerContainer.clientWidth;
        this.visibleHeight = innerContainer.clientHeight;
        this.scrollRatio = this.contentHeight ? this.visibleHeight / this.contentHeight : 1;
        const reachedBottomOnCurrentRender = this.state.scrollPos >= this.contentHeight - this.visibleHeight;
        const contentResized = prevContentHeight !== this.contentHeight;

        this.toggleScrollIfNeeded();

        this.position = {
            top: boundingRect.top + window.pageYOffset,
            left: boundingRect.left + window.pageXOffset
        };

        if (this.props.freezePosition || prevProps.freezePosition) {
            this.adjustFreezePosition(prevProps);
        }
        if (typeof this.props.scrollTo !== 'undefined' && this.props.scrollTo !== prevProps.scrollTo) {
            this.updateScrollPosition(this.props.scrollTo);
        } else if (this.props.keepAtBottom && contentResized && reachedBottomOnPrevRender && !reachedBottomOnCurrentRender) {
            this.updateScrollPosition(this.contentHeight - this.visibleHeight);
        }
    },
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onHandleDrag);
        document.removeEventListener('mouseup', this.onHandleDragEnd);
    },
    adjustFreezePosition(prevProps) {
        const innerContainer = this.getScrolledElement();
        const contentWrapper = this.refs.contentWrapper;

        if (this.props.freezePosition) {
            contentWrapper.scrollTop = this.state.scrollPos;
        }

        if (prevProps.freezePosition) {
            innerContainer.scrollTop = this.state.scrollPos;
        }
    },
    toggleScrollIfNeeded() {
        const shouldHaveScroll = this.contentHeight - this.visibleHeight > 1;
        if (this.hasScroll !== shouldHaveScroll) {
            this.hasScroll = shouldHaveScroll;
            this.forceUpdate();
        }
    },
    getScrollTop() {
        return this.getScrolledElement().scrollTop;
    },
    updateScrollPosition(scrollValue) {
        const innerContainer = this.getScrolledElement();
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
        const clickYRelativeToScrollbar = clickEvent.pageY - this.position.top;
        const scrollHandleTop = this.getScrollHandleStyle().top;
        let newScrollHandleTop;
        const isBelowHandle = clickYRelativeToScrollbar > (scrollHandleTop + this.scrollHandleHeight);
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
        const handlePosition = this.state.scrollPos * this.scrollRatio;
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
        const mouseDeltaY = event.pageY - this.startDragMousePos;
        const handleTopPosition = ensureWithinLimits(this.startDragHandlePos + mouseDeltaY, 0, this.visibleHeight - this.scrollHandleHeight);
        const newScrollValue = this.getScrollValueFromHandlePosition(handleTopPosition);
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
        const contentNode = e.currentTarget;
        const totalHeight = e.currentTarget.scrollHeight;
        const maxScroll = totalHeight - e.currentTarget.offsetHeight;
        const delta = e.deltaY % 3 ? (e.deltaY) : (e.deltaY * 10);
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
        let res = 'inner-container';
        if (this.state.scrollPos && this.props.addScrolledClass) {
            res += ' content-scrolled';
        }
        return res;
    },
    getScrollStyles() {
        const scrollSize = this.scrollbarYWidth || 20;
        const marginKey = this.props.rtl ? 'marginLeft' : 'marginRight';
        const innerContainerStyle = {
            [marginKey]: (-1 * scrollSize),
            height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : ''
        };
        const contentWrapperStyle = {
            [marginKey]: this.scrollbarYWidth ? 0 : scrollSize,
            height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : '',
            overflowY: this.props.freezePosition ? 'hidden' : 'visible'
        };

        return {
            innerContainer: innerContainerStyle,
            contentWrapper: contentWrapperStyle
        };
    },
    getOuterContainerStyle() {
        return {
            height: (this.props.heightRelativeToParent || this.props.flex) ? '100%' : ''
        };
    },
    getRootStyles() {
        const result = {};

        if (this.props.heightRelativeToParent) {
            result.height = this.props.heightRelativeToParent;
        } else if (this.props.flex) {
            result.flex = this.props.flex;
        }

        return result;
    },
    render() {
        const scrollStyles = this.getScrollStyles();
        const rootStyle = this.getRootStyles();
        const scrollHandleStyle = enforceMinHandleHeight.call(this, this.getScrollHandleStyle());

        return (
            <div className={`custom-scroll ${ this.state.onDrag ? 'scroll-handle-dragged' : ''}`}
                 style={rootStyle}>
                <div className="outer-container"
                     style={this.getOuterContainerStyle()}
                     onMouseDown={this.onMouseDown}
                     onClick={this.onClick}>
                    {this.hasScroll ? (
                        <div ref="customScrollbar"
                             className={`custom-scrollbar${ this.props.rtl ? ' custom-scrollbar-rtl' : ''}`}
                             key="scrollbar">
                            <div ref="scrollHandle" className="custom-scroll-handle" style={scrollHandleStyle}>
                                <div className={this.props.handleClass}></div>
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
