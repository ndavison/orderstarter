/**
 * Unit tests for the Menu model.
 */

describe('MenuModel', function() {

    describe('create()', function () {
        it('should create a menu without error.', function(done) {
            Menu.create({title: "A test menu", owner: "Joey Joe Joe"}).exec(function(err) {
                if (err) throw err;
                done();
            });
        });
    });
    
    describe('beforeCreate', function() {
        it('should auto generate an id string for menus on creation.', function(done) {
            Menu.create({title: "A test menu", owner: "Joey Joe Joe"}).exec(function(err, created) {
                if (err) throw err;
                created.should.have.property('id').with.lengthOf(Menu.idLength);
                done();
            });
        });
    });
    
});
 