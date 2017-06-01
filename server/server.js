
const express = require("express");


let app = express();

const logger = global.logger = require('./services/logger')(app);
//global.app = app;

//COMPRESSION
compression = require('compression');
app.use(compression());

app.get('/', (req,res)=> {
    res.status(200).send("Hello World")
});
port = process.env.PORT || 3000;

app.listen(port);

