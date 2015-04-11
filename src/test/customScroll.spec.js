define(['react', 'customScroll/customScroll'], function(React, customScrollClass){
    'use strict';

    describe('custom scroll', function(){
        var TestUtils = React.addons.TestUtils;
        var scrollbarWidth;

        function getCustomScroll(props){
            return TestUtils.renderIntoDocument(React.createElement(customScrollClass, props));
        }

        beforeEach(function(){
            scrollbarWidth = 17;
        });

        describe('initialization', function(){
            it('should have scrollbar width with value 0', function(){
                var customScroll = getCustomScroll({});

                expect(customScroll.scrollbarWidth).toEqual(0);
            });

            it('should update scrollbarWidth and state after mounting', function(){
                var customScroll = getCustomScroll({});
                var contentWidth = 200;
                spyOn(customScroll.refs.innerContainer, 'getDOMNode').and.returnValue({
                    offsetWidth: scrollbarWidth + contentWidth,
                    clientWidth: contentWidth
                });

                customScroll.forceUpdate();

                expect(customScroll.scrollbarWidth).toEqual(scrollbarWidth);
            });
        });
    });
});
