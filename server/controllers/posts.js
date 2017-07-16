
const catchErr = require('../services/errorhandler').catchErr;
const express = require('express');
//const router = express.Router();

module.exports = (app) => {

    app.get('/posts/list', catchErr(async function (req, res) {
        let posts = await Post.fetchAll();
        logger.log('info', 'fetched posts for post list: ', posts)
        return res.status(200).send(posts)
    }));

};
