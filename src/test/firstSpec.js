define(['lodash'], function(_){
    describe('general test', function(){
        it('Should be false', function(){

            expect(true).toEqual(true);
        });

        it('Should have lodsah', function(){
            var someArr = [1,2,3];

            var result = _.contains(someArr,3);

            expect(result).toEqual(true);
        });
    });
})
