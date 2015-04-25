/**
 * Unit tests for the MenuId service.
 */

describe('MenuId service', function () {
    
    describe('generate()', function() {
        it('should generate a string of the length provided in the argument.', function(done) {
            var str = MenuId.generate(5);
            str.should.be.lengthOf(5);
            done();
        });
        it('should generate a different string when called again.', function(done) {
            var str1 = MenuId.generate(12);
            var str2 = MenuId.generate(12);
            str1.should.not.be.exactly(str2);
            done();
        });
    });
    
});
 