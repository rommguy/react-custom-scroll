(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"), require("lodash"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM", "lodash", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["ReactCustomScroll"] = factory(require("React"), require("ReactDOM"), require("lodash"), require("jquery"));
	else
		root["ReactCustomScroll"] = factory(root["React"], root["ReactDOM"], root["lodash"], root["jquery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var customScroll = __webpack_require__(2);

	module.exports = {
	    CustomScroll: customScroll
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(3);
	var reactDOM = __webpack_require__(4);
	var _ = __webpack_require__(5);
	var $ = __webpack_require__(6);
	var template = __webpack_require__(7);

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
	    render: template
	});



/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(3);
	var _ = __webpack_require__(5);
	module.exports = function () {
	    return React.createElement('div', {
	        'className': 'custom-scroll',
	        'style': { height: this.props.heightRelativeToParent }
	    }, React.createElement('div', {
	        'className': 'outer-container',
	        'style': this.getOuterContainerStyle()
	    }, this.hasScroll ? React.createElement('div', {
	        'className': 'custom-scrollbar ' + (this.state.onDrag ? 'handleDrag' : ''),
	        'onClick': this.onCustomScrollClick,
	        'key': 'scrollbar'
	    }, React.createElement('div', {
	        'ref': 'scrollHandle',
	        'className': 'custom-scroll-handle',
	        'style': this.getScrollHandleStyle(),
	        'onMouseDown': this.onHandleMouseDown
	    }, React.createElement('div', { 'className': 'inner-handle' }))) : null, React.createElement('div', {
	        'ref': 'innerContainer',
	        'className': _.keys(_.pick({
	            'inner-container': true,
	            'content-scrolled': this.state.scrollPos && this.props.addScrolledClass
	        }, _.identity)).join(' '),
	        'style': this.getScrollStyles().innerContainer,
	        'onScroll': this.onScroll,
	        'onWheel': this.blockOuterScroll
	    }, React.createElement('div', {
	        'className': 'content-wrapper',
	        'ref': 'contentWrapper',
	        'style': this.getScrollStyles().contentWrapper
	    }, '\n                ', this.props.children, '\n            '))));
	};

/***/ }
/******/ ])
});
;