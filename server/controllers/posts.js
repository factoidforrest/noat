
const catchErr = require('../services/errorhandler').catchErr;
const express = require('express');
const router = express.Router();

router.get('/list', catchErr(async function(req, res){
    let posts = await Post.fetchAll()
    return res.status(200).send(posts)
}));

module.exports = router;