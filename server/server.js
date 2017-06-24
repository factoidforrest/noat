const production = process.env.PRODUCTION == 'true'

const express = require("express");


let app = global.app = express();
require('./services/serveFrontEnd')(app);


global.production = process.env.NODE_ENV === 'production';

const logger = require('./services/logger')(app);
const db = require('./services/database');
//global.app = app;

//compression
compression = require('compression');
app.use(compression());

app.get('/', (req,res)=> {
    res.render('main')
});



//ROUTER LOGIC
require('./services/router')(app);

require('./services/errorhandler').middleware(app);

port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
