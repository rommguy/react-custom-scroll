var React = require('react');
var TestUtils = require('react-addons-test-utils');
var reactDOM = require('react-dom');
var customScrollClass = require('../main/customScroll.js');


describe('custom scroll', function () {
    'use strict';

    beforeEach(function () {
        this.customScrollContainer = document.createElement('div');
        this.customScrollContainer.id = 'testScrollContainer';
        document.body.appendChild(this.customScrollContainer);
    });

    afterEach(function () {
        document.body.removeChild(this.customScrollContainer);
    });

    function getCustomScroll(props) {
        this.totalScrollHeight = 200;
        this.visibleHeight = 100;
        var scrolledContent = React.createElement('div', {
            style: {
                height: this.totalScrollHeight,
                width: 50
            }
        });
        var content = React.createElement('div', {
            style: {
                maxHeight: this.visibleHeight,
                width: 50
            }
        }, scrolledContent);
        return reactDOM.render(React.createElement(customScrollClass, props, content), this.customScrollContainer);
    }

    describe('general functionality', function () {
        beforeEach(function () {
            this.customScroll = getCustomScroll.call(this);
            this.customScroll.forceUpdate();
        });

        describe('getScrollStyles', function () {
            describe('when native scrollbar exists', function () {
                beforeEach(function () {
                    this.nativeScrollWidth = 15;
                    var innerContainer = {
                        scrollTop: 0,
                        offsetWidth: 0,
                        clientWidth: 0
                    };
                    spyOn(this.customScroll, 'getScrolledElement').and.returnValue(innerContainer);

                    innerContainer.clientWidth = 50;
                    innerContainer.offsetWidth = innerContainer.clientWidth + this.nativeScrollWidth;
                    this.customScroll.forceUpdate();
                });

                it('should position the inner container to the right with minus the size of the scrollbar', function () {
                    var innerContainerStyle = this.customScroll.refs.innerContainer.props.style;

                    expect(innerContainerStyle.marginRight).toEqual(-1 * this.nativeScrollWidth);
                });
            });

            describe('when there is no native scrollbar (mac floating scrollbar)', function () {
                beforeEach(function () {
                    var innerContainer = {
                        scrollTop: 0,
                        offsetWidth: 0,
                        clientWidth: 0
                    };
                    spyOn(this.customScroll, 'getScrolledElement').and.returnValue(innerContainer);
                    innerContainer.clientWidth = 50;
                    innerContainer.offsetWidth = innerContainer.clientWidth;

                    this.customScroll.forceUpdate();
                });

                it('should position the inner container to the right with minus 20 pixels', function () {
                    var innerContainerStyle = this.customScroll.refs.innerContainer.props.style;

                    expect(innerContainerStyle.marginRight).toEqual(-20);
                });
            });
        });

        describe('when scrolling content', function () {
            it('should update scroll handle position', function () {
                var initialHandlePos = this.customScroll.getScrollHandleStyle().top;
                var contentContainerNode = this.customScroll.refs.innerContainer;

                contentContainerNode.scrollTop = this.totalScrollHeight / 4;
                TestUtils.Simulate.scroll(contentContainerNode);

                var newHandlePos = this.customScroll.getScrollHandleStyle().top;

                expect(newHandlePos).toEqual(initialHandlePos + this.visibleHeight / 4);
            });

            it('should call onScroll callback from props if defined', function () {
                var propsOnScroll = jasmine.createSpy('onScroll');
                this.customScroll = getCustomScroll.call(this, {
                    onScroll: propsOnScroll
                });
                this.customScroll.forceUpdate();
                var contentContainerNode = this.customScroll.refs.innerContainer;

                TestUtils.Simulate.scroll(contentContainerNode);

                expect(propsOnScroll).toHaveBeenCalled();
            });

            describe('allow outer scroll', function () {
                it('should block wheel event from reaching outer container if allow outer scroll is falsy', function () {
                    expect(true).toEqual(true);
                });

                it('should not block wheel event if allow outer scroll is truthy', function () {
                    expect(true).toEqual(true);
                });
            });
        });

        describe('scroll handle size', function () {
            it('should set the size of the handle relative to the scrollbar, in the same ratio as the content size to the visible area size');
        });
    });

    describe('freeze position', function () {
        beforeEach(function () {
            this.customScroll = getCustomScroll.call(this, {
                freezePosition: true
            });
        });

        it('should not scroll');
    });

    describe('heightRelativeToParent', function () {
        describe('when defined', function () {
            beforeEach(function () {
                this.customScroll = getCustomScroll.call(this, {
                    heightRelativeToParent: '70%'
                });
            });

            it('should set value passed as heightRelativeToParent on the root element, and 100% on other containers', function () {
                var rootStyle = reactDOM.findDOMNode(this.customScroll).style;
                var innerContainerStyle = this.customScroll.refs.innerContainer.style;
                var contentWrapperStyle = this.customScroll.refs.contentWrapper.style;


                expect(rootStyle.height).toEqual('70%');
                expect(innerContainerStyle.height).toEqual('100%');
                expect(contentWrapperStyle.height).toEqual('100%');
            });
        });

        describe('when not defined', function () {
            beforeEach(function () {
                this.customScroll = getCustomScroll.call(this, {});
            });

            it('should set value passed as heightRelativeToParent on the root element, and 100% on other containers', function () {
                var rootStyle = reactDOM.findDOMNode(this.customScroll).style;
                var innerContainerStyle = this.customScroll.refs.innerContainer.style;
                var contentWrapperStyle = this.customScroll.refs.contentWrapper.style;


                expect(rootStyle.height).toBeFalsy();
                expect(innerContainerStyle.height).toBeFalsy();
                expect(contentWrapperStyle.height).toBeFalsy();
            });
        });
    });
});

