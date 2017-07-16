const setup = require('./utilities/setup')
const colors = require('colors');
const request = require('supertest');
const assert = require('assert');
require('../server/server');
/*
describe('Posts', function() {
    //REWRITE
    before(function(){
        console.log("--------------------User------------------------------------------------------------".bold.cyan.bgBlue)
        let post = new Post({
            "title":"Post Title",
            "body":"Post Body"
        });
        return post.save();

    });
    describe('/user/register', function() {
        it('should return a list with one post', function() {
            return request(app)
                .post('/user/register')
                .send({
                    username: 'testuser',
                    password: 'password',
                    email: testEmail
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.success === 'true');

                });

        });
    });
});

    */mocha