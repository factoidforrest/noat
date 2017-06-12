
adapters = require('../../knexfile');

env = process.env.NODE_ENV || "development";

/*
adapter = {
    "development": adapters.development,
    "test": adapters.test,
    "production": adapters.production
}
*/
console.log(adapters[env]);

class Database {
    constructor() {
        this.knex = require('knex')(adapters[env]);
        this.bookshelf = require('bookshelf')(this.knex);
        this.bookshelf.plugin('virtuals');
        this.bookshelf.plugin('visibility');
        //console.log(this.bookshelf);
        this.models = {
            //user: require('./../models/user')(this.bookshelf),
            //token: require('./../models/token')(this.bookshelf),
            //authentication: require('./../models/authentication')(this.bookshelf)
        };
        logger.log('info',"Database connected");
    }
}


//connect the db the first time this file is required by server.coffee
let db = global.db = new Database();

module.exports = db;