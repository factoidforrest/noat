const production = process.env.PRODUCTION === 'true';
sass = require('node-sass-middleware')
const buildSystem = require('../../views/build_system');
const express = require('express');

module.exports = function(app){

    //app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
    app.locals.uglify = production;

    app.set('view engine', 'pug');
    app.set('views', __dirname + '/../../views/templates');

    app.use(sass({
        src: __dirname + '/../../views/stylesheets',
        dest: __dirname + '/../../views/public',
        debug: !production,
        outputStyle: production? 'compressed' : 'nested'
    }))

    app.use(express.static(__dirname + '/../../views/public', { maxAge: 1 }))

};