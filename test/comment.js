const setup = require('./utilities/setup');
const colors = require('colors');
const request = require('supertest');
const assert = require('assert');
require('../server/server');

describe('Posts', function() {
    //REWRITE
    let post;
    before(async function(){
        console.log("--------------------COMMENTS------------------------------------------------------------".bold.cyan.bgBlue)
        post = new Post({
            "title":"Post Title",
            "body":"Post Body"
        });
        post = await post.save();


    });

    describe('/comment/create', function() {
        it('should post a comment', function() {
            return request(app)
                .post('/comment/create')
                .send({
                    "token": setup.key,
                    "body":"Sample comment body",
                    "post_id": post.get('id'),
                    "parent": null
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .then( res => {
                    console.log(res.body);
                    assert(res.body.length === 1);

                });

        });
    });
});