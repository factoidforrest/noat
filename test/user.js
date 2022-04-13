const setup = require('./utilities/setup')
const colors = require('colors');
const request = require('supertest');
const assert = require('assert');
require('../server/server');

describe('Users', function() {
    //REWRITE
    before(function(){
        console.log("--------------------User------------------------------------------------------------".bold.cyan.bgBlue)
    });
    describe('/user/register', function() {
        it('should register a user', function() {
            return request(app)
                .post('/user/register')
                .send({
                    username: 'testuser',
                    password: 'password',
                    email: testEmail
                })
                .expect(200)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.success === true);
                });
        });

        it('should fail if username taken', function(){
            return request(app)
                .post('/user/register')
                .send({
                    username: 'testuser',
                    password: 'password',
                    email: testEmail
                })
                .expect(400)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.errName === 'usernameTaken');
                });
        });

        it('should fail if password is too short',function(){
            return request(app)
                .post('/user/register')
                .send({
                    username: 'AnotherTestUser',
                    password: '2shrt',
                    email: testEmail
                })
                .expect(422)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.errName === 'passwordTooShort');
                });
        })
    });

    describe('/user/login', function() {
        it('should login a user', function() {
            return request(app)
                .post('/user/login')
                .send({
                    username: 'testuser',
                    password: 'password'
                })
                .expect(200)
                .then( res => {
                    console.log(res.body);
                    assert(!!res.body.user);
                });
        });

        it('should fail to login with wrong credentials', function() {
            return request(app)
                .post('/user/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                })
                .expect(401)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.errName === "PasswordIncorrect")
                });

        })
    });
});
