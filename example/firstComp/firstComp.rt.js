define([
    'react',
    'lodash',
    'customScroll'
], function (React, _, customScroll) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'example-wrapper' }, !this.isFlexExample() ? React.createElement('div', {
            'key': 'native-example',
            'className': 'container native-scroll'
        }, React.createElement('label', { 'className': 'side-title' }, 'Native Scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'This is boring')), React.createElement('div', { 'className': 'panel-content-native panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText())))) : null, !this.isFlexExample() ? React.createElement('div', {
            'key': 'cool-example',
            'className': 'container custom-scroll-example'
        }, React.createElement('label', { 'className': 'side-title' }, 'Custom Scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Cool Scrollbar !')), React.createElement(customScroll, { 'allowOuterScroll': true }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, !this.isFlexExample() ? React.createElement('div', {
            'key': 'crazy-example',
            'className': 'container custom-scroll-example'
        }, React.createElement('label', { 'className': 'side-title' }, 'Crazy Designer'), React.createElement('div', { 'className': 'panel crazy-scroll' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Who designed this ???')), React.createElement(customScroll, { 'allowOuterScroll': true }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, this.isFlexExample() ? React.createElement('div', {
            'key': 'flex-example',
            'className': 'container example-flex-wrapper'
        }, React.createElement('label', { 'className': 'side-title' }, 'With CSS Flex'), React.createElement('div', { 'className': 'panel flex-scroll' }, React.createElement('div', { 'className': 'panel-header' }, React.createElement('label', { 'className': 'panel-title' }, 'Flexbox!!!')), React.createElement(customScroll, {
            'allowOuterScroll': true,
            'flex': '1'
        }, React.createElement('div', { 'className': 'panel-content-custom panel-content' }, React.createElement('div', { 'className': 'content-fill' }, this.getText()))))) : null, React.createElement('div', { 'className': 'scroll-creator' }));
    };
});