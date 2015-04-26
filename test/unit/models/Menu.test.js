/**
 * Unit tests for the Menu model.
 */

describe('Menu model', function() {

    describe('create()', function () {
        it('should create a menu without error.', function(done) {
            Menu.create({title: "A test menu", owner: "Joey Joe Joe"}).exec(function(err) {
                if (err) throw err;
                done();
            });
        });
    });
    
    describe('beforeCreate()', function() {
        it('should auto generate an id string for menus on creation.', function(done) {
            Menu.create({title: "A test menu", owner: "Joey Joe Joe"}).exec(function(err, created) {
                if (err) throw err;
                created.should.have.property('id').with.lengthOf(Menu.idLength);
                done();
            });
        });
    });
    
    describe('destroy()', function() {
        it('should delete a menu without error.', function(done) {
            Menu
              .create({title: "A test menu", owner: "Joey Joe Joe"})
              .then(function (menu) {
                menu.should.have.property('id');
                return menu;
              })
              .then(function (menu) {
                menu.destroy().then(function (menu) { 
                  Menu.findOne({id: menu.id}).then(function (menu) {
                        (typeof menu).should.equal('undefined');
                        done();
                    })
                });
              });
        });
    });
    
});
 