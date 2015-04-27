/**
 * MenuController unit tests.
 */


var request = require('supertest');

describe('/menu', function() {
    
    describe('POST', function() {
        it('should create a menu.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201, done);
        });    
    });
    
    describe('GET without a password', function() {
        it('should get a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .get('/menu/' + menuId)
                .expect(200, done)
            });
        });    
    });
    
    describe('GET with a correct password', function() {
        it('should get a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .get('/menu/' + menuId + '?password=strongpassword')
                .expect(200, done)
            });
        });    
    });
    
    describe('GET with an incorrect password', function() {
        it('should fail to get a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .get('/menu/' + menuId + '?password=wrongpassword')
                .expect(403, done)
            });
        });    
    });
    
    describe('GET with a filter', function() {
        it('should get a menu using a filter.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu 1', owner: 'mike'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .post('/menu')
                .send({title: 'A dummy menu 2', owner: 'steve'})
                .expect(201)
                .end(function(err, res) {
                    if (err) done(err);
                    request(sails.hooks.http.app)
                    .get('/menu/?owner=mike')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) done(err);
                        res.body.should.have.lengthOf(1);
                        res.body[0].should.have.property('title');
                        res.body[0].owner.should.equal('mike');
                        done();
                    });
                });
            });
        });    
    });
    
    describe('DELETE without a password', function() {
        it('should delete a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .delete('/menu/' + menuId)
                .expect(200)
                .end(function(err, res) {
                    if (err) done(err);
                    request(sails.hooks.http.app)
                    .get('/menu/' + menuId)
                    .expect(404, done);
                });
            });
        });    
    });
    
    describe('DELETE with a correct password', function() {
        it('should delete a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .delete('/menu/' + menuId)
                .send({password: 'strongpassword'})
                .expect(200)
                .end(function(err, res) {
                    if (err) done(err);
                    request(sails.hooks.http.app)
                    .get('/menu/' + menuId)
                    .expect(404, done);
                });
            });
        });    
    });
    
    describe('DELETE with an incorrect password', function() {
        it('should fail to delete a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .delete('/menu/' + menuId)
                .send({password: 'wrongpassword'})
                .expect(403)
                .end(function(err, res) {
                    if (err) done(err);
                    request(sails.hooks.http.app)
                    .get('/menu/' + menuId + '?password=strongpassword')
                    .expect(200, done);
                });
            });
        });    
    });
    
    describe('PUT without a password', function() {
        it('should update a menu without a password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .put('/menu/' + menuId)
                .send({title: 'A new dummy menu'})
                .expect(200)
                .end(function(err, res) {
                    if (err) done(err);
                    res.body.should.have.property('title');
                    res.body.title.should.equal('A new dummy menu');
                    done();
                });
            });
        });    
    });
    
    describe('PUT with a correct password', function() {
        it('should update a menu with a correct password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .put('/menu/' + menuId)
                .send({title: 'A new dummy menu', password: 'strongpassword'})
                .expect(200)
                .end(function(err, res) {
                    if (err) done(err);
                    res.body.should.have.property('title');
                    res.body.title.should.equal('A new dummy menu');
                    done();
                });
            });
        });    
    });
    
    describe('PUT with an incorrect password', function() {
        it('should fail to update a menu with an incorrect password.', function(done) {
            request(sails.hooks.http.app)
            .post('/menu')
            .send({title: 'A dummy menu', owner: 'Dummy Owner', password: 'strongpassword'})
            .expect(201)
            .end(function(err, res) {
                if (err) done(err);
                var menuId = res.body.id;
                request(sails.hooks.http.app)
                .put('/menu/' + menuId)
                .send({title: 'A new dummy menu', password: 'wrongpassword'})
                .expect(403)
                .end(function(err, res) {
                    if (err) done(err);
                    request(sails.hooks.http.app)
                    .get('/menu/' + menuId + '?password=strongpassword')
                    .end(function(err, res) {
                        if (err) done(err);
                        res.body.should.have.property('title');
                        res.body.title.should.equal('A dummy menu');
                        done();
                    })
                });
            });
        });    
    });
    
});
