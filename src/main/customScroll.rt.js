define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
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
});