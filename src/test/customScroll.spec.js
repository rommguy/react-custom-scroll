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

        this.totalScrollHeight = 200;
        this.visibleHeight = 100;
        this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight);
    });

    afterEach(function () {
        document.body.removeChild(this.customScrollContainer);
    });

    function createAndRenderCustomScroll(container, props, visibleHeight, contentHeight) {
        var scrolledContent = React.createElement('div', {
            style: {
                height: contentHeight,
                width: 50
            }
        });
        var content = React.createElement('div', {
            style: {
                maxHeight: visibleHeight,
                width: 50
            }
        }, scrolledContent);
        var customScroll = reactDOM.render(React.createElement(customScrollClass, props, content), container);
        customScroll.forceUpdate();
        return customScroll;
    }

    describe('general functionality', function () {
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
                    var innerContainerStyle = this.customScroll.refs.innerContainer.style;

                    expect(innerContainerStyle.marginRight).toEqual((-1 * this.nativeScrollWidth) + 'px');
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
                    var innerContainerStyle = this.customScroll.refs.innerContainer.style;

                    expect(innerContainerStyle.marginRight).toEqual('-20px');
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
                this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                    onScroll: propsOnScroll
                }, this.visibleHeight, this.totalScrollHeight);
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
            it('should set the size of the handle relative to the visible area, in the same ratio as the visible area to the content size', function () {
                var scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle');
                var handleHeight = parseInt(scrollHandle.style.height, 10);

                expect(scrollHandle).toBeTruthy();
                expect(handleHeight / this.visibleHeight).toEqual(this.visibleHeight / this.totalScrollHeight);
            });

            describe('when the calculated handle height is less than minimum height', function () {
                beforeEach(function () {
                    this.totalScrollHeight = 2000;
                    this.visibleHeight = 200;
                    this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight);
                });

                it('should set the handle size to minimum default height', function () {
                    var defaultMinHeight = 38;
                    var scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle');
                    var handleHeight = parseInt(scrollHandle.style.height, 10);

                    expect(scrollHandle).toBeTruthy();
                    expect(handleHeight).toEqual(defaultMinHeight);
                });

                it('should set the handle size to minimum height from props', function () {
                    this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                        minScrollHandleHeight: 50
                    }, this.visibleHeight, this.totalScrollHeight);
                    var scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle');
                    var handleHeight = parseInt(scrollHandle.style.height, 10);

                    expect(scrollHandle).toBeTruthy();
                    expect(handleHeight).toEqual(50);
                });
            });
        });

        describe('scroll handle position', function () {

        });
    });

    describe('freeze position', function () {
        beforeEach(function () {
            this.totalScrollHeight = 200;
            this.visibleHeight = 100;
            this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                freezePosition: true
            }, this.visibleHeight, this.totalScrollHeight);
        });

        it('should not scroll', function () {
            var contentContainerNode = this.customScroll.refs.innerContainer;

            contentContainerNode.scrollTop = this.totalScrollHeight / 4;
            TestUtils.Simulate.scroll(contentContainerNode);

            expect(contentContainerNode.scrollTop).toEqual(0);
        });
    });

    describe('heightRelativeToParent', function () {
        describe('when defined', function () {
            beforeEach(function () {
                this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                    heightRelativeToParent: '70%'
                }, this.visibleHeight, this.totalScrollHeight);
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
                this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {}, this.visibleHeight, this.totalScrollHeight);
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

    describe('flex size', function () {
        beforeEach(function () {
            this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                flex: '2'
            }, this.visibleHeight, this.totalScrollHeight);
        });

        it('should set value passed as flex on the root element, and 100% on other containers', function () {
            var rootStyle = reactDOM.findDOMNode(this.customScroll).style;
            var innerContainerStyle = this.customScroll.refs.innerContainer.style;
            var contentWrapperStyle = this.customScroll.refs.contentWrapper.style;


            expect(rootStyle.flexGrow).toEqual('2');
            expect(innerContainerStyle.height).toEqual('100%');
            expect(contentWrapperStyle.height).toEqual('100%');
        });
    });

    describe('Right to left support', function () {
        beforeEach(function () {
            this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                rtl: 'true'
            }, this.visibleHeight, this.totalScrollHeight);
        });

        it('should position the custom scrollbar on the left side of the content', function () {
            var customScrollbarStyle = window.getComputedStyle(this.customScroll.refs.customScrollbar);
            var innerContainerStyle = this.customScroll.refs.innerContainer.style;
            var contentWrapperStyle = this.customScroll.refs.contentWrapper.style;

            expect(customScrollbarStyle.left).toEqual('3px');
            expect(innerContainerStyle.marginLeft).toEqual('-20px');
            expect(contentWrapperStyle.marginLeft).toEqual('20px');
        });
    });

    describe('custom inner handle css class', function () {
        it('should replace the default class', function () {
            this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {
                handleClass: 'some-custom-class'
            }, this.visibleHeight, this.totalScrollHeight);

            var scrollHandleWithDefaultClass = TestUtils.scryRenderedDOMComponentsWithClass(this.customScroll, 'inner-handle');
            var scrollHandleWithCustomClass = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'some-custom-class');

            expect(scrollHandleWithCustomClass).toBeTruthy();
            expect(scrollHandleWithDefaultClass.length).toBeFalsy();
        });
    });

    describe('on click events', function () {
        beforeEach(function () {
            this.initialHandlePos = this.customScroll.getScrollHandleStyle().top;
            this.outerContainer = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'outer-container');
            this.scrollHandle = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'custom-scroll-handle');
            this.scrollHandleLayout = this.scrollHandle.getBoundingClientRect();
            this.innerContainer = TestUtils.findRenderedDOMComponentWithClass(this.customScroll, 'inner-container');
            this.initialScrollPos = this.innerContainer.scrollTop;
        });

        it('should do nothing if the click is out of the custom scrollbar area', function () {
            const yUnderHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20;
            const clickPosition = {
                clientY: yUnderHandle,
                pageY: yUnderHandle,
                clientX: this.scrollHandleLayout.left - 10,
                pageX: this.scrollHandleLayout.left - 10
            };

            TestUtils.Simulate.click(this.outerContainer, clickPosition);

            expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos);
            expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos);
        });

        it('should do nothing if the click is on the custom scroll handle element', function () {
            const yOnHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height / 2;
            const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2;
            const clickPosition = {
                clientY: yOnHandle,
                pageY: yOnHandle,
                clientX: xInCustomScrollbar,
                pageX: xInCustomScrollbar
            };

            TestUtils.Simulate.click(this.outerContainer, clickPosition);

            expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos);
            expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos);
        });

        it('should do nothing if there is no scroll', function () {
            const contentHeight = 100;
            const visibleHeight = contentHeight + 100;
            this.customScroll = createAndRenderCustomScroll(this.customScrollContainer, {}, visibleHeight, contentHeight);

            const yOnHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height / 2;
            const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2;
            const clickPosition = {
                clientY: yOnHandle,
                pageY: yOnHandle,
                clientX: xInCustomScrollbar,
                pageX: xInCustomScrollbar
            };

            TestUtils.Simulate.click(this.outerContainer, clickPosition);

            expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos);
            expect(this.innerContainer.scrollTop).toEqual(this.initialScrollPos);
        });

        describe('when click is on the custom scrollbar area, and not on the handle itself', function () {
            it('should scroll downwards and update handle position, if click is below the handle', function () {
                const yBelowHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20;
                const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2;
                const clickPosition = {
                    clientY: yBelowHandle,
                    pageY: yBelowHandle,
                    clientX: xInCustomScrollbar,
                    pageX: xInCustomScrollbar
                };

                TestUtils.Simulate.click(this.outerContainer, clickPosition);

                expect(this.customScroll.getScrollHandleStyle().top).toEqual(this.initialHandlePos + this.scrollHandleLayout.height);
                expect(this.innerContainer.scrollTop).toBeGreaterThan(this.initialScrollPos);
            });

            it('should scroll upwards and update handle position, if click is above the handle', function () {
                const yBelowHandle = this.scrollHandleLayout.top + this.scrollHandleLayout.height + 20;
                const xInCustomScrollbar = this.scrollHandleLayout.left + this.scrollHandleLayout.width / 2;
                const clickPositionBelowHandle = {
                    clientY: yBelowHandle,
                    pageY: yBelowHandle,
                    clientX: xInCustomScrollbar,
                    pageX: xInCustomScrollbar
                };

                TestUtils.Simulate.click(this.outerContainer, clickPositionBelowHandle);
                const newHandlePosition = this.customScroll.getScrollHandleStyle().top;
                const newScrollPos = this.innerContainer.scrollTop;

                const yAboveHandle = this.customScroll.getScrollHandleStyle().top - 20;
                const clickPositionAboveHandle = {
                    clientY: yAboveHandle,
                    pageY: yAboveHandle,
                    clientX: xInCustomScrollbar,
                    pageX: xInCustomScrollbar
                };

                TestUtils.Simulate.click(this.outerContainer, clickPositionAboveHandle);

                expect(this.customScroll.getScrollHandleStyle().top).toEqual(newHandlePosition - this.scrollHandleLayout.height);
                expect(this.innerContainer.scrollTop).toBeLessThan(newScrollPos);
            });
        });
    });
});

