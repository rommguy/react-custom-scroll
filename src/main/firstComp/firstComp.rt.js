define([
    'react/addons',
    'lodash',
    'customScroll/customScroll'
], function (React, _, customScroll) {
    'use strict';
    return function () {
        return React.createElement('div', {}, React.createElement('div', { 'className': 'container native-scroll' }, React.createElement('label', { 'className': 'side-title' }, 'Native scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panelHeader' }, React.createElement('label', { 'className': 'panel-title' }, 'Settings')), React.createElement('div', { 'className': 'panel-content-native' }, React.createElement('div', { 'className': 'content-fill' })))), React.createElement('div', { 'className': 'container custom-scroll-example' }, React.createElement('label', { 'className': 'side-title' }, 'Custom scroll'), React.createElement('div', { 'className': 'panel' }, React.createElement('div', { 'className': 'panelHeader' }, React.createElement('label', { 'className': 'panel-title' }, 'Settings')), React.createElement(customScroll, { 'allowOuterScroll': true }, React.createElement('div', { 'className': 'panel-content-custom' }, React.createElement('div', { 'className': 'content-fill' }))))), React.createElement('div', { 'className': 'scroll-creator' }));
    };
});