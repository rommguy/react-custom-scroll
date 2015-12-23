define(['react', 'customScroll/customScroll'], function (React, customScrollClass) {
    'use strict';

    describe('custom scroll', function () {
        var testUtils = React.addons.TestUtils;

        function getCustomScroll(props){
            return testUtils.renderIntoDocument(React.createElement(customScrollClass, props));
        }

        describe('general functionality', function(){
            beforeEach(function(){
                this.customScroll = getCustomScroll();
                this.customScroll.forceUpdate();
            });

            describe('getScrollStyles', function(){
                describe('when native scrollbar exists', function(){
                    beforeEach(function(){
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

                    it('should position the inner container to the right with minus the size of the scrollbar', function(){
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-1 * this.nativeScrollWidth);
                    });
                });

                describe('when there is no native scrollbar (mac floating scrollbar)', function(){
                    it('should position the inner container to the right with minus 20 pixels', function(){
                        var styles = this.customScroll.getScrollStyles();

                        expect(styles.innerContainer.marginRight).toEqual(-20);
                    });
                });

            });
        });

        describe('freeze position', function(){
            beforeEach(function(){
                this.customScroll = getCustomScroll({
                    freezePosition: true
                });
            });

            it('should not scroll ');
        });

    });
});
