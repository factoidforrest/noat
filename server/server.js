
const production = process.env.PRODUCTION === 'true';

const express = require("express");


let app = global.app = express();
require('./services/serveFrontEnd')(app);


global.production = process.env.NODE_ENV === 'production';

const logger = require('./services/logger')(app);
const db = require('./services/database');
//global.app = app;

//compression
const compression = require('compression');
const bodyParser = require('body-parser');

app.use(compression());
app.use(bodyParser.json());

//custom middlewares
app.use(require('./services/tokenMiddleware'));
require('./services/roles')(app);

app.get('/', (req,res)=> {
    res.render('main')
});

//ROUTER LOGIC
require('./services/router')(app);

require('./services/errorhandler').middleware(app);


app.use(function(req, res, next){
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
