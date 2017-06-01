
const express = require("express");
let app = express();
global.app = app;

//COMPRESSION
compression = require('compression');
app.use(compression());

app.get('/', (req,res)=> {
    res.send("Hello World")
});
port = process.env.PORT || 3000;

app.listen(port);

