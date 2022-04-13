let adapters, dbConf, destroy, destroyAll, knex, registered;

process.env.NODE_ENV = 'test';

process.env.PORT = 1234;

global.testEmail = 'light24bulbs+test@gmail.com';
global.setupEmail = 'light24bulbs+allcalls@gmail.com';

adapters = require('../../knexfile');
const request = require('supertest');
dbConf = adapters[process.env.NODE_ENV];

knex = require('knex')(dbConf);

registered = false;


let user;
let app;
module.exports.user = null;
module.exports.key = null;

if (!registered) {
    console.log('registering destroy hook');
    before(async function() {
        console.log('setup before hook called');
        registered = true;
        await destroyAll(function() {
            app = require('../../server/server');
            return Promise.resolve();
        });
        await registerUser();
        return login();
    });
}

function registerUser(){
    return request(app)
        .post('/user/register')
        .send({
            username: 'testuserglobal',
            password: 'password',
            email: testEmail
        })
        .expect(200)
        .then( res => {
            module.exports.user = res.body.user;
            console.log('registered user in setup ', res.body)
        });
}
function login(){
    return request(app)
        .post('/user/login')
        .send({
            username: 'testuserglobal',
            password: 'password'
        })
        .expect(200)
        .then( res => {
            module.exports.key = res.body.token.random_key;
            console.log('got token in setup ', res.body)
        });
}

module.exports.destroyAll = destroyAll = function(done) {
    return knex.migrate.rollback(dbConf).then(function() {
        console.log('rolled back database');
        return knex.migrate.latest(dbConf).then(function() {
            console.log('migrated database');
            return done();
        });
    });

    /*
     console.log('calling async destroy on models')
     async.map [User, Token, Card, Authentication, Meal, Gift, Invitation, Transaction, Reward, RewardProgram, Survey], destroy, (err, results) ->
     db.knex.select('*').from('reward_programs')
     .del()
     .then (numRows) ->
     console.log('destroyed this many reward programs: ', numRows)
     done()
     */
};

module.exports.destroy = destroy = function(model, cb) {
    return model.collection().fetch().then(function(collection) {
        return collection.invokeThen('destroy').then(function() {
            return cb();
        });
    });
};
