
const express = require("express");


let app = express();

global.production = process.env.NODE_ENV === 'production';

const logger = global.logger = require('./services/logger')(app);
const db = require('./services/database');
//global.app = app;

//COMPRESSION
compression = require('compression');
app.use(compression());

app.get('/', (req,res)=> {
    res.status(200).send("Hello World")
});
port = process.env.PORT || 3000;

app.listen(port);

