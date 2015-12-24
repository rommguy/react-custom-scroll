define(['react', 'react-dom', 'customScroll/customScroll'], function (React, reactDOM, customScrollClass) {
    'use strict';

    describe('custom scroll', function () {
        var testUtils = React.addons.TestUtils;

        function getCustomScroll(props) {
            var scrolledContent = React.createElement('div', {
                style: {
                    height: 200,
                    width: 50
                }
            });
            var content = React.createElement('div', {
                style: {
                    maxHeight: 100,
                    display: 'inline-block'
                }
            }, scrolledContent);
            return testUtils.renderIntoDocument(React.createElement(customScrollClass, props, content));
        }

        describe('general functionality', function () {
            beforeEach(function () {
                this.customScroll = getCustomScroll();
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
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-1 * this.nativeScrollWidth);
                    });
                });

                describe('when there is no native scrollbar (mac floating scrollbar)', function () {
                    it('should position the inner container to the right with minus 20 pixels', function () {
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-20);
                    });
                });

            });

            describe('when scrolling content', function () {
                beforeEach(function () {
                    // TODO GuyR 12/23/15 23:12 - make sure the content has scroll
                });
                it('should update scroll handle position', function () {
                    var initialHandlePos = this.customScroll.getScrollHandleStyle().top;
                    var contentContainerNode = this.customScroll.refs.innerContainer;

                    this.customScroll.setState({
                        scrollPos: 50
                    });
                    //contentContainerNode.scrollTop = 50;

                    var newHandlePos = this.customScroll.getScrollHandleStyle().top;

                    expect(newHandlePos).not.toEqual(initialHandlePos);
                });

                it('should call onScroll callback from props if defined', function () {
                    var propsOnScroll = jasmine.createSpy('onScroll');

                    expect(propsOnScroll).toHaveBeenCalled();
                });

                describe('when allowOuterScroll prop us false or undefined', function () {
                    it('should block wheel event from reaching outer container');
                });

                describe('when allowOuterScroll prop is true', function () {
                    it('should not block wheel event');
                });
            });

            describe('scroll handle size', function () {
                it('should set the size of the handle relative to the scrollbar, in the same ratio as the content size to the visible area size');
            });
        });

        describe('freeze position', function () {
            beforeEach(function () {
                this.customScroll = getCustomScroll({
                    freezePosition: true
                });
            });

            it('should not scroll ');
        });

    })
    ;
})
;
