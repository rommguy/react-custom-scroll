define(['React', 'ReactDOM', 'customScroll/customScroll'], function (React, reactDOM, customScrollClass) {
    'use strict';

    describe('custom scroll', function () {
        var testUtils = React.addons.TestUtils;

        function loadCSS(url, callback) {
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;

            document.getElementsByTagName('head')[0].appendChild(link);

            var img = document.createElement('img');
            img.onerror = function () {
                if (callback) {
                    callback(link);
                }
            };
            img.src = url;
        }

        beforeEach(function (done) {
            loadCSS('/base/styles.css', function (linkElm) {
                this.link = linkElm;

                this.customScrollContainer = document.createElement('div');
                this.customScrollContainer.id = 'testScrollContainer';
                document.body.appendChild(this.customScrollContainer);
                done();
            }.bind(this));
        });

        afterEach(function () {
            document.body.removeChild(this.customScrollContainer);
            var head = document.getElementsByTagName('head')[0];
            head.removeChild(this.link);
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
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-1 * this.nativeScrollWidth);
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
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-20);
                    });
                });
            });

            describe('when scrolling content', function () {
                it('should update scroll handle position', function () {
                    var initialHandlePos = this.customScroll.getScrollHandleStyle().top;
                    var contentContainerNode = this.customScroll.refs.innerContainer;

                    contentContainerNode.scrollTop = this.totalScrollHeight / 4;
                    testUtils.Simulate.scroll(contentContainerNode);

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

                    testUtils.Simulate.scroll(contentContainerNode);

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
                this.customScroll = getCustomScroll.call(this, {
                    freezePosition: true
                });
            });

            it('should not scroll ');
        });
    });
});

