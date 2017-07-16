let adapters, dbConf, destroy, destroyAll, knex, registered;

process.env.NODE_ENV = 'test';

process.env.PORT = 1234;

global.testEmail = 'light24bulbs@gmail.com'

adapters = require('../../knexfile');

dbConf = adapters[process.env.NODE_ENV];

knex = require('knex')(dbConf);

registered = false;

if (!registered) {
    console.log('registering destroy hook');
    before(function() {
        console.log('setup before hook called');
        registered = true;
        return destroyAll(function() {
            let app = require('../../server/server');
            return Promise.resolve();
        });
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
