/**
 * OrderController unit tests.
 */

var request = require('supertest');

describe('/order', function() {

    describe('POST without a password', function() {
        it('should create an order from a menu without a password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        res.body.should.have.property('id');
                        done();
                    });
                });
            });
        });
    });
    
    describe('POST with a correct password', function() {
        it('should create an order from a menu with a correct password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        res.body.should.have.property('id');
                        done();
                    });
                });
            });
        });
    });
    
    describe('POST with an incorrect password', function() {
        it('should fail to create an order from a menu with an incorrect password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'wrongpassword'})
                    .expect(403, done);
                });
            });
        });
    });
    
    describe('GET without a password', function() {
        it('should get an order from a menu without a password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .get('/order/' + orderId)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            res.body.should.have.property('name');
                            res.body.should.have.property('items');
                            res.body.name.should.equal('Dummy User');
                            res.body.items.should.be.lengthOf(1);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    describe('GET with a correct password', function() {
        it('should get an order from a menu with a correct password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .get('/order/' + orderId + '?password=strongpassword')
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            res.body.should.have.property('name');
                            res.body.should.have.property('items');
                            res.body.name.should.equal('Dummy User');
                            res.body.items.should.be.lengthOf(1);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('GET with an incorrect password', function() {
        it('should fail to get an order from a menu with an incorrect password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .get('/order/' + orderId + '?password=wrongpassword')
                        .expect(403, done);
                    });
                });
            });
        });
    });
    
    describe('DELETE without a password', function() {
        it('should delete an order from a menu without a password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .delete('/order/' + orderId)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId)
                            .expect(404, done);
                        });
                    });
                });
            });
        });
    });
    
    describe('DELETE with a correct password', function() {
        it('should delete an order from a menu with a correct password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .delete('/order/' + orderId)
                        .send({password: 'strongpassword'})
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId + '?password=strongpassword')
                            .expect(404, done);
                        });
                    });
                });
            });
        });
    });

    describe('DELETE with an incorrect password', function() {
        it('should fail to delete an order from a menu with an incorrect password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .delete('/order/' + orderId)
                        .send({password: 'wrongpassword'})
                        .expect(403)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId + '?password=strongpassword')
                            .expect(200, done);
                        });
                    });
                });
            });
        });
    });
    
    describe('PUT without a password', function() {
        it('should update an order from a menu without a password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .put('/order/' + orderId)
                        .send({name: 'Dummy User 2'})
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId)
                            .expect(200)
                            .end(function(err, res) {
                                if (err) done(err);
                                res.body.should.have.property('name');
                                res.body.name.should.equal('Dummy User 2');
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    
    describe('PUT with a correct password', function() {
        it('should update an order from a menu with a correct password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .put('/order/' + orderId)
                        .send({name: 'Dummy User 2', password: 'strongpassword'})
                        .expect(200)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId + '?password=strongpassword')
                            .expect(200)
                            .end(function(err, res) {
                                if (err) done(err);
                                res.body.should.have.property('name');
                                res.body.name.should.equal('Dummy User 2');
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    describe('PUT with an incorrect password', function() {
        it('should fail to update an order from a menu with an incorrect password.', function(done) {
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
                    var menuItemId = res.body.id
                    request(sails.hooks.http.app)
                    .post('/order')
                    .send({menu: menuId, items: [menuItemId], name: 'Dummy User', password: 'strongpassword'})
                    .expect(201)
                    .end(function(err, res) {
                        if (err) done(err);
                        var orderId = res.body.id;
                        request(sails.hooks.http.app)
                        .put('/order/' + orderId)
                        .send({name: 'Dummy User 2', password: 'wrongpassword'})
                        .expect(403)
                        .end(function(err, res) {
                            if (err) done(err);
                            request(sails.hooks.http.app)
                            .get('/order/' + orderId + '?password=strongpassword')
                            .expect(200)
                            .end(function(err, res) {
                                if (err) done(err);
                                res.body.should.have.property('name');
                                res.body.name.should.equal('Dummy User');
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});
