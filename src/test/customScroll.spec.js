define(['react', 'customScroll/customScroll'], function (React, customScrollClass) {
    'use strict';

    describe('custom scroll', function () {
        var TestUtils = React.addons.TestUtils;
        var scrollbarWidth;

        function getCustomScroll(props) {
            return TestUtils.renderIntoDocument(React.createElement(customScrollClass, props));
        }

        beforeEach(function () {
            scrollbarWidth = 17;
        });

        describe('initialization', function () {
            it('should have scrollbar width with value 0', function () {
                var customScroll = getCustomScroll({});

                expect(customScroll.scrollbarWidth).toEqual(0);
            });
        });

        describe('', function () {
            var customScroll, contentWidth, contentHeight, clientHeight;

            beforeEach(function () {
                customScroll = getCustomScroll({});
                contentWidth = 200;
                contentHeight = 1000;
                clientHeight = 250;
                spyOn(customScroll.refs.innerContainer, 'getDOMNode').and.returnValue({
                    offsetWidth: scrollbarWidth + contentWidth,
                    clientWidth: contentWidth,
                    scrollHeight: contentHeight,
                    clientHeight: clientHeight
                });
            });

            it('should update scrollbarWidth and state', function () {
                customScroll.forceUpdate();

                expect(customScroll.scrollbarWidth).toEqual(scrollbarWidth);
            });

            it('should calculate scrollbar handle height', function () {
                customScroll.forceUpdate();

                var expectedHeight = clientHeight * clientHeight / contentHeight;

                expect(customScroll.scrollHandleHeight).toEqual(expectedHeight);
            });
        });
    });
});
