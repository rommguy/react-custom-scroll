'use strict';
var React = require('react');
var _ = require('lodash');
function scopeScrollStyles1() {
    var scrollStyles = this.getScrollStyles();
    return React.createElement('div', {
        'ref': 'innerContainer',
        'className': this.getInnerContainerClasses(),
        'style': scrollStyles.innerContainer,
        'onScroll': this.onScroll,
        'onWheel': this.blockOuterScroll
    }, React.createElement('div', {
        'className': 'content-wrapper',
        'ref': 'contentWrapper',
        'style': scrollStyles.contentWrapper
    }, '\n                ', this.props.children, '\n            '));
}
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
    }, React.createElement('div', { 'className': 'inner-handle' }))) : null, scopeScrollStyles1.apply(this, [])));
};