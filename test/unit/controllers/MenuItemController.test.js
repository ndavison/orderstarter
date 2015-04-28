/**
 * MenuItemController unit tests.
 */

var request = require('supertest');

describe('/menuitem', function() {
    
    describe('POST without a password', function() {
        it('should create a menu item for a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    res.body.should.have.property('id');
                    done();
                });
            });
        });    
    });
    
    describe('POST with a correct password', function() {
        it('should create a menu item for a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    res.body.should.have.property('id');
                    done();
                });
            });
        });    
    });
    
    describe('POST with an incorrect password', function() {
        it('should fail to create a menu item for a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'wrongpassword'})
                .expect(403, done);
            });
        });    
    });
    
    describe('GET without a password', function() {
        it('should get a menuitem without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .get('/menuitem/' + menuItemId)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) done(err);
                        res.body.should.have.property('id');
                        res.body.id.should.equal(menuItemId);
                        done();
                    });
                });
            });
        });
    });
    
    describe('GET with a correct password', function() {
        it('should get a menuitem with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .get('/menuitem/' + menuItemId + '?password=strongpassword')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) done(err);
                        res.body.should.have.property('id');
                        res.body.id.should.equal(menuItemId);
                        done();
                    });
                });
            });
        });
    });
    
    describe('GET with an incorrect password', function() {
        it('should fail to get a menuitem with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .get('/menuitem/' + menuItemId + '?password=wrongpassword')
                    .expect(403, done);
                });
            });
        });
    });
    
    describe('DELETE without a password', function() {
        it('should delete a menu item for a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .delete('/menuitem/' + menuItemId)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) done(err);
                        request(sails.hooks.http.app)
                        .get('/menuitem/' + menuItemId)
                        .expect(404, done);
                    });
                });
            });
        });    
    });
    
    describe('DELETE with a correct password', function() {
        it('should delete a menu item for a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .delete('/menuitem/' + menuItemId)
                    .send({password: 'strongpassword'})
                    .expect(200)
                    .end(function(err, res) {
                        if (err) done(err);
                        request(sails.hooks.http.app)
                        .get('/menuitem/' + menuItemId)
                        .expect(404, done);
                    });
                });
            });
        });    
    });
    
    describe('DELETE with an incorrect password', function() {
        it('should fail to delete a menu item for a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .delete('/menuitem/' + menuItemId)
                    .send({password: 'wrongpassword'})
                    .expect(403)
                    .end(function(err, res) {
                        if (err) done(err);
                        request(sails.hooks.http.app)
                        .get('/menuitem/' + menuItemId + '?password=strongpassword')
                        .expect(200, done);
                    });
                });
            });
        });    
    });
    
    describe('PUT without a password', function() {
        it('should update a menu item for a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .put('/menuitem/' + menuItemId)
                    .send({title: 'An updated dummy item'})
                    .expect(200)
                    .end(function (err, res) {
                        if (err) done(err);
                        res.body.should.have.property('title');
                        res.body.title.should.equal('An updated dummy item');
                        done();
                    });
                });
            });
        });    
    });
    
    describe('PUT with a correct password', function() {
        it('should update a menu item for a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .put('/menuitem/' + menuItemId)
                    .send({title: 'An updated dummy item', password: 'strongpassword'})
                    .expect(200)
                    .end(function (err, res) {
                        if (err) done(err);
                        res.body.should.have.property('title');
                        res.body.title.should.equal('An updated dummy item');
                        done();
                    });
                });
            });
        });    
    });
    
    describe('PUT with an incorrect password', function() {
        it('should fail to update a menu item for a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menuitem')
                .send({title: 'A dummy item', menu: menuId, password: 'strongpassword'})
                .expect(201)
                .end(function (err, res) {
                    if (err) done(err);
                    var menuItemId = res.body.id;
                    request(sails.hooks.http.app)
                    .put('/menuitem/' + menuItemId)
                    .send({title: 'An updated dummy item', password: 'wrongpassword'})
                    .expect(403)
                    .end(function (err, res) {
                        if (err) done(err);
                        request(sails.hooks.http.app)
                        .get('/menuitem/' + menuItemId + '?password=strongpassword')
                        .expect(200)
                        .end(function (err, res) {
                            if (err) done(err);
                            res.body.should.have.property('title');
                            res.body.title.should.equal('A dummy item');
                            done();
                        });
                    });
                });
            });
        });    
    });
});
