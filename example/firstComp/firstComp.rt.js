'use strict';
var React = require('react');
var _ = require('lodash');
var customScroll = require('../../src/main/customScroll');
module.exports = function () {
    function repeatContent1(exampleTypes, content, contentIndex) {
        return React.createElement('div', {
            'className': 'dynamic-content',
            'key': content
        }, content);
    }
    function scopeExampleTypes2() {
        var exampleTypes = this.getExamplesToDisplay();
        return React.createElement('div', { 'className': 'example-wrapper' }, exampleTypes.standard ? React.createElement('div', {
            'key': 'native-example',
            'className': 'container native-scroll'
        }, React.createElement('label', { 'className': 'side-title' }, 'Native Scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'This is boring')), React.createElement('div', { 'className': 'panel-content-native panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText())))) : null, exampleTypes.standard ? React.createElement('div', {
            'key': 'cool-example',
            'className': 'container custom-scroll-example'
        }, React.createElement('label', { 'className': 'side-title' }, 'Custom Scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Cool Scrollbar !')), React.createElement(customScroll, { 'allowOuterScroll': true }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, exampleTypes.standard ? React.createElement('div', {
            'key': 'crazy-example',
            'className': 'container custom-scroll-example'
        }, React.createElement('label', { 'className': 'side-title' }, 'Crazy Designer'), React.createElement('div', { 'className': 'panel crazy-scroll' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Who designed this ???')), React.createElement(customScroll, { 'allowOuterScroll': true }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, exampleTypes.flex ? React.createElement('div', {
            'key': 'flex-example',
            'className': 'container example-flex-wrapper'
        }, React.createElement('label', { 'className': 'side-title' }, 'With CSS Flex'), React.createElement('div', { 'className': 'panel flex-scroll' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Flexbox!!!')), React.createElement(customScroll, {
            'allowOuterScroll': true,
            'flex': '1'
        }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, exampleTypes.dynamic ? React.createElement('div', {
            'key': 'dynamic-example',
            'className': 'container example-dynamic-wrapper'
        }, React.createElement('label', { 'className': 'side-title' }, 'KeepAtBottom prop'), React.createElement('div', { 'className': 'panel dynamic-scroll' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'DYNAMIC CONTENT!!!')), React.createElement(customScroll, {
            'allowOuterScroll': true,
            'keepAtBottom': true
        }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement.apply(this, [
            'div',
            { 'className': 'content-fill' },
            _.map(this.getDynamicContent(), repeatContent1.bind(this, exampleTypes))
        ])))), exampleTypes.dynamic ? React.createElement('button', {
            'className': 'dynamic-content-button',
            'key': 'addContent',
            'onClick': this.addContent
        }, 'Add Content') : null, exampleTypes.dynamic ? React.createElement('button', {
            'className': 'dynamic-content-button',
            'key': 'removeContent',
            'onClick': this.removeContent
        }, 'Remove Content') : null) : null, React.createElement('div', { 'className': 'scroll-creator' }));
    }
    return scopeExampleTypes2.apply(this, []);
};